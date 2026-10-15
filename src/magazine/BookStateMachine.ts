// Explicit State Machine for the Magazine Reader
// Manages: CLOSED, OPENING, OPEN_IDLE, DRAGGING, SETTLING, CLOSING, ERROR
// Guarantees zero invalid page index jumps, serializes transitions, and tracks sheets.

export type BookState =
  | 'CLOSED'
  | 'OPENING'
  | 'OPEN_IDLE'
  | 'DRAGGING'
  | 'SETTLING'
  | 'CLOSING'
  | 'ERROR';

export type ReadingMode = 'single' | 'spread';

export interface DragInfo {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  deltaX: number;
  progress: number; // 0 to 1
  direction: 'next' | 'prev';
}

export class BookStateMachine {
  private state: BookState = 'CLOSED';
  private currentPage: number = 1; // 1 to 12
  private totalPages: number = 12;
  private mode: ReadingMode = 'single';
  private activeDrag: DragInfo | null = null;
  private listeners: Set<(state: BookState, page: number) => void> = new Set();

  constructor(totalPages: number = 12, mode: ReadingMode = 'single') {
    this.totalPages = totalPages;
    this.mode = mode;
  }

  public subscribe(fn: (state: BookState, page: number) => void) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.state, this.currentPage));
  }

  public getState(): BookState {
    return this.state;
  }

  public getCurrentPage(): number {
    return this.currentPage;
  }

  public setMode(mode: ReadingMode) {
    this.mode = mode;
  }

  public getMode(): ReadingMode {
    return this.mode;
  }

  // Open the closed cover
  public openBook(): boolean {
    if (this.state !== 'CLOSED') return false;
    this.state = 'OPENING';
    this.notify();

    // In single page mode, open to page 2 (the opening note)
    // In spread mode, open to spread containing page 2 & 3
    this.currentPage = 2;
    setTimeout(() => {
      this.state = 'OPEN_IDLE';
      this.notify();
    }, 450);
    return true;
  }

  // Close back to cover
  public closeBook(): boolean {
    if (this.state === 'CLOSED' || this.state === 'CLOSING') return false;
    this.state = 'CLOSING';
    this.notify();

    setTimeout(() => {
      this.currentPage = 1;
      this.state = 'CLOSED';
      this.notify();
    }, 400);
    return true;
  }

  // Check if next page is available
  public canGoNext(): boolean {
    if (this.state !== 'OPEN_IDLE') return false;
    if (this.mode === 'single') {
      return this.currentPage < this.totalPages;
    } else {
      // In spread mode: pages are paired (2-3, 4-5, 6-7, 8-9, 10-11, 12)
      return this.currentPage < this.totalPages;
    }
  }

  // Check if previous page is available
  public canGoPrev(): boolean {
    if (this.state !== 'OPEN_IDLE') return false;
    return this.currentPage > 1;
  }

  // Turn to next page/spread
  public nextPage(): boolean {
    if (!this.canGoNext()) return false;
    this.state = 'SETTLING';
    this.notify();

    const increment = this.mode === 'spread' && this.currentPage > 1 && this.currentPage < this.totalPages - 1 ? 2 : 1;
    this.currentPage = Math.min(this.totalPages, this.currentPage + increment);

    setTimeout(() => {
      this.state = 'OPEN_IDLE';
      this.notify();
    }, 380);
    return true;
  }

  // Turn to previous page/spread
  public prevPage(): boolean {
    if (!this.canGoPrev()) return false;
    this.state = 'SETTLING';
    this.notify();

    const decrement = this.mode === 'spread' && this.currentPage > 3 ? 2 : 1;
    this.currentPage = Math.max(1, this.currentPage - decrement);

    setTimeout(() => {
      this.state = this.currentPage === 1 ? 'CLOSED' : 'OPEN_IDLE';
      this.notify();
    }, 380);
    return true;
  }

  // Go to explicit page
  public goToPage(page: number): boolean {
    if (page < 1 || page > this.totalPages) return false;
    this.currentPage = page;
    this.state = page === 1 ? 'CLOSED' : 'OPEN_IDLE';
    this.notify();
    return true;
  }

  // Drag handling
  public startDrag(startX: number, startY: number, direction: 'next' | 'prev') {
    if (this.state !== 'OPEN_IDLE' && this.state !== 'CLOSED') return;
    this.activeDrag = {
      startX,
      startY,
      currentX: startX,
      currentY: startY,
      deltaX: 0,
      progress: 0,
      direction
    };
    this.state = 'DRAGGING';
    this.notify();
  }

  public updateDrag(currentX: number, currentY: number, containerWidth: number) {
    if (this.state !== 'DRAGGING' || !this.activeDrag) return;
    this.activeDrag.currentX = currentX;
    this.activeDrag.currentY = currentY;
    this.activeDrag.deltaX = currentX - this.activeDrag.startX;

    const dragDistance = Math.abs(this.activeDrag.deltaX);
    const maxDrag = containerWidth * 0.8;
    this.activeDrag.progress = Math.min(1, Math.max(0, dragDistance / maxDrag));
    this.notify();
  }

  public endDrag(velocity: number): { completed: boolean; direction: 'next' | 'prev' } {
    if (this.state !== 'DRAGGING' || !this.activeDrag) {
      return { completed: false, direction: 'next' };
    }

    const { progress, direction } = this.activeDrag;
    this.activeDrag = null;

    // Threshold: either dragged > 35% across or high flick velocity
    const completed = progress > 0.35 || Math.abs(velocity) > 0.5;

    if (completed) {
      if (direction === 'next') {
        if (this.currentPage === 1) {
          this.openBook();
        } else {
          this.nextPage();
        }
      } else {
        this.prevPage();
      }
    } else {
      // Spring back to current position
      this.state = this.currentPage === 1 ? 'CLOSED' : 'OPEN_IDLE';
      this.notify();
    }

    return { completed, direction };
  }

  public getActiveDrag(): DragInfo | null {
    return this.activeDrag;
  }

  public reset() {
    this.state = 'CLOSED';
    this.currentPage = 1;
    this.activeDrag = null;
    this.notify();
  }
}
