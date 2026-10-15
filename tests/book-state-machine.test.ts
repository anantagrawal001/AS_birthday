import { describe, it, expect, vi } from 'vitest';
import { BookStateMachine } from '../src/magazine/BookStateMachine';

describe('BookStateMachine Engine', () => {
  it('should initialize at page 1 in CLOSED state', () => {
    const sm = new BookStateMachine(12, 'single');
    expect(sm.getState()).toBe('CLOSED');
    expect(sm.getCurrentPage()).toBe(1);
    expect(sm.canGoPrev()).toBe(false);
  });

  it('should open book from CLOSED state and transition to OPEN_IDLE', async () => {
    vi.useFakeTimers();
    const sm = new BookStateMachine(12, 'single');

    const opened = sm.openBook();
    expect(opened).toBe(true);
    expect(sm.getState()).toBe('OPENING');

    vi.advanceTimersByTime(500);
    expect(sm.getState()).toBe('OPEN_IDLE');
    expect(sm.getCurrentPage()).toBe(2);
    expect(sm.canGoPrev()).toBe(true);
    expect(sm.canGoNext()).toBe(true);

    vi.useRealTimers();
  });

  it('should navigate sequentially through pages without bounds overflow', async () => {
    vi.useFakeTimers();
    const sm = new BookStateMachine(12, 'single');
    sm.openBook();
    vi.advanceTimersByTime(500);

    // Navigate to page 3, 4, ... 12
    for (let p = 2; p < 12; p++) {
      expect(sm.canGoNext()).toBe(true);
      sm.nextPage();
      vi.advanceTimersByTime(400);
      expect(sm.getCurrentPage()).toBe(p + 1);
    }

    // At page 12 (back cover), cannot go next
    expect(sm.getCurrentPage()).toBe(12);
    expect(sm.canGoNext()).toBe(false);
    expect(sm.nextPage()).toBe(false);

    vi.useRealTimers();
  });

  it('should handle gesture drag thresholds and spring back vs completion', () => {
    const sm = new BookStateMachine(12, 'single');
    sm.goToPage(3);
    expect(sm.getState()).toBe('OPEN_IDLE');

    // Start drag
    sm.startDrag(200, 300, 'next');
    expect(sm.getState()).toBe('DRAGGING');

    // Small drag: deltaX = -20 (only 5% progress) -> should spring back
    sm.updateDrag(180, 300, 400);
    expect(sm.getActiveDrag()?.progress).toBeLessThan(0.35);

    const resultLow = sm.endDrag(0.1);
    expect(resultLow.completed).toBe(false);
    expect(sm.getCurrentPage()).toBe(3); // Stayed on page 3!
    expect(sm.getState()).toBe('OPEN_IDLE');

    // Substantial drag: deltaX = -180 (over 45% progress) -> should complete
    sm.startDrag(200, 300, 'next');
    sm.updateDrag(20, 300, 400);
    const resultHigh = sm.endDrag(0.6);
    expect(resultHigh.completed).toBe(true);
  });

  it('should reset safely to CLOSED state on cover close', async () => {
    vi.useFakeTimers();
    const sm = new BookStateMachine(12, 'single');
    sm.goToPage(5);

    sm.closeBook();
    expect(sm.getState()).toBe('CLOSING');

    vi.advanceTimersByTime(450);
    expect(sm.getState()).toBe('CLOSED');
    expect(sm.getCurrentPage()).toBe(1);

    vi.useRealTimers();
  });
});
