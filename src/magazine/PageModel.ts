import { MAGAZINE_PAGES, MagazinePageFace } from '../content/magazinePages';
import { getPhotoByTag } from '../content/photoManifest';

export class PageModel {
  public static getPage(pageNumber: number): MagazinePageFace | undefined {
    return MAGAZINE_PAGES.find((p) => p.pageNumber === pageNumber);
  }

  public static getAllPages(): MagazinePageFace[] {
    return MAGAZINE_PAGES;
  }

  public static getTotalPages(): number {
    return MAGAZINE_PAGES.length;
  }

  /**
   * Generates accessible textual representation for screen readers
   * and the "Read page text" high-contrast accessibility modal.
   */
  public static getAccessiblePageText(pageNumber: number): string {
    const page = this.getPage(pageNumber);
    if (!page) return '';

    const lines: string[] = [];
    lines.push(`Page ${page.pageNumber}: ${page.title}`);
    if (page.subtitle) lines.push(page.subtitle);
    if (page.pullQuote) lines.push(`"${page.pullQuote}"`);
    if (page.bodyText) lines.push(page.bodyText);
    if (page.caption) lines.push(page.caption);

    if (page.primaryPhotoTags.length > 0) {
      lines.push('Photographs:');
      page.primaryPhotoTags.forEach((tag) => {
        try {
          const photo = getPhotoByTag(tag);
          lines.push(`- ${photo.alt}`);
        } catch {
          lines.push(`- ${tag}`);
        }
      });
    }

    return lines.join('\n\n');
  }

  /**
   * Determine spread pairing for desktop:
   * Page 1 is standalone cover (recto)
   * Spreads: [2, 3], [4, 5], [6, 7], [8, 9], [10, 11]
   * Page 12 is standalone back cover (verso)
   */
  public static getSpreadPages(currentPage: number): { left: number | null; right: number | null } {
    if (currentPage === 1) {
      return { left: null, right: 1 };
    }
    if (currentPage === 12) {
      return { left: 12, right: null };
    }

    // Interior spread: left is even (verso), right is odd (recto)
    const left = currentPage % 2 === 0 ? currentPage : currentPage - 1;
    const right = left + 1 <= 12 ? left + 1 : null;
    return { left, right };
  }
}
