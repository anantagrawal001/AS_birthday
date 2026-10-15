import { describe, it, expect } from 'vitest';
import { PageModel } from '../src/magazine/PageModel';
import { getMagazinePrimaryTags } from '../src/content/magazinePages';

describe('Magazine 12-Page Model and Editorial Sequence', () => {
  it('should have exactly 12 logical editorial pages', () => {
    const pages = PageModel.getAllPages();
    expect(pages.length).toBe(12);
    expect(PageModel.getTotalPages()).toBe(12);

    // Verify first page is front cover
    expect(pages[0].pageNumber).toBe(1);
    expect(pages[0].isCover).toBe(true);
    expect(pages[0].isBackCover).toBe(false);
    expect(pages[0].side).toBe('recto');

    // Verify 12th page is back cover
    expect(pages[11].pageNumber).toBe(12);
    expect(pages[11].isCover).toBe(false);
    expect(pages[11].isBackCover).toBe(true);
    expect(pages[11].side).toBe('verso');
  });

  it('should contain exactly the 12 primary source photos in the documented Section 04A sequence', () => {
    const expectedSequence = [
      'PHOTO_01', // P02
      'PHOTO_11', // P03
      'PHOTO_13', // P04
      'PHOTO_17', // P05
      'PHOTO_19', // P06
      'PHOTO_20', // P07 A
      'PHOTO_24', // P07 B
      'PHOTO_26', // P08
      'PHOTO_27', // P09
      'PHOTO_29', // P10
      'PHOTO_31', // P11 A
      'PHOTO_35'  // P11 B
    ];

    const actualPrimaryTags = getMagazinePrimaryTags();
    expect(actualPrimaryTags).toEqual(expectedSequence);
    expect(actualPrimaryTags.length).toBe(12);

    // Verify each appears exactly once
    const set = new Set(actualPrimaryTags);
    expect(set.size).toBe(12);
  });

  it('should correctly calculate spread pairs for desktop reading', () => {
    // Page 1 is cover (only right side)
    expect(PageModel.getSpreadPages(1)).toEqual({ left: null, right: 1 });

    // Interior spreads
    expect(PageModel.getSpreadPages(2)).toEqual({ left: 2, right: 3 });
    expect(PageModel.getSpreadPages(3)).toEqual({ left: 2, right: 3 });
    expect(PageModel.getSpreadPages(4)).toEqual({ left: 4, right: 5 });
    expect(PageModel.getSpreadPages(7)).toEqual({ left: 6, right: 7 });
    expect(PageModel.getSpreadPages(10)).toEqual({ left: 10, right: 11 });
    expect(PageModel.getSpreadPages(11)).toEqual({ left: 10, right: 11 });

    // Page 12 is back cover (only left side)
    expect(PageModel.getSpreadPages(12)).toEqual({ left: 12, right: null });
  });

  it('should provide accessible text transcripts for all 12 pages', () => {
    for (let p = 1; p <= 12; p++) {
      const text = PageModel.getAccessiblePageText(p);
      expect(text).toBeDefined();
      expect(text.length).toBeGreaterThan(10);
      expect(text).toContain(`Page ${p}:`);
    }
  });
});
