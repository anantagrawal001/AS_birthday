import { describe, it, expect } from 'vitest';
import { PHOTO_MANIFEST, PHOTO_LIST, getPhotoByTag } from '../src/content/photoManifest';
import fs from 'fs';
import path from 'path';

describe('Photo Manifest and Audit Verification', () => {
  it('should contain all 35 photos with unique PHOTO_01 to PHOTO_35 identifiers', () => {
    expect(PHOTO_LIST.length).toBe(35);
    for (let i = 1; i <= 35; i++) {
      const tag = `PHOTO_${String(i).padStart(2, '0')}`;
      expect(PHOTO_MANIFEST[tag]).toBeDefined();
      expect(PHOTO_MANIFEST[tag].index).toBe(i);
      expect(PHOTO_MANIFEST[tag].tag).toBe(tag);
    }
  });

  it('should classify PHOTO_28 as ai-illustrated, PHOTO_35 as real, and PHOTO_32 as real-lowres excluded by default', () => {
    const photo28 = getPhotoByTag('PHOTO_28');
    const photo35 = getPhotoByTag('PHOTO_35');
    const photo32 = getPhotoByTag('PHOTO_32');

    expect(photo28.category).toBe('ai-illustrated');
    expect(photo35.category).toBe('real');
    expect(photo32.category).toBe('real-lowres');
    expect(photo32.excludeByDefault).toBe(true);
    expect(photo28.excludeByDefault).toBe(false);
    expect(photo35.excludeByDefault).toBe(false);
  });

  it('should maintain photobooth cells PHOTO_03 to PHOTO_10 in strict numeric order and verify they are not hero images', () => {
    for (let i = 3; i <= 10; i++) {
      const tag = `PHOTO_${String(i).padStart(2, '0')}`;
      const photo = getPhotoByTag(tag);
      expect(photo.isPhotobooth).toBe(true);
      expect(photo.naturalWidth).toBe(360);
      expect(photo.naturalHeight).toBe(268);
      expect(photo.sections).toContain('Ch05');
      expect(photo.sections).not.toContain('Ch01'); // Not used as hero
    }
  });

  it('should verify all public image derivatives exist on disk and have valid bytes', () => {
    PHOTO_LIST.forEach((photo) => {
      const webpPath = path.join(process.cwd(), 'public', photo.derivatives.webp);
      const jpgPath = path.join(process.cwd(), 'public', photo.derivatives.jpg);
      const thumbPath = path.join(process.cwd(), 'public', photo.derivatives.thumb);

      expect(fs.existsSync(webpPath)).toBe(true);
      expect(fs.existsSync(jpgPath)).toBe(true);
      expect(fs.existsSync(thumbPath)).toBe(true);

      const statWebp = fs.statSync(webpPath);
      const statJpg = fs.statSync(jpgPath);
      const statThumb = fs.statSync(thumbPath);

      expect(statWebp.size).toBeGreaterThan(1000);
      expect(statJpg.size).toBeGreaterThan(1000);
      expect(statThumb.size).toBeGreaterThan(500);
    });
  });

  it('should ensure every photo has non-empty semantic alt text and focal point settings', () => {
    PHOTO_LIST.forEach((photo) => {
      expect(photo.alt).toBeDefined();
      expect(photo.alt.trim().length).toBeGreaterThan(5);
      expect(photo.focalPoint.mobile).toBeDefined();
      expect(photo.focalPoint.desktop).toBeDefined();
    });
  });
});
