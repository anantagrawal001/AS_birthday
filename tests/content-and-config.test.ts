import { describe, it, expect } from 'vitest';
import { BIRTHDAY } from '../src/content/config';
import { getPhotoByTag } from '../src/content/photoManifest';

describe('Central Content & Configuration Integrity', () => {
  it('should maintain recipient and sender identity', () => {
    expect(BIRTHDAY.recipient.fullName).toBe('Aanya Sharma');
    expect(BIRTHDAY.recipient.displayName).toBe('Aanya');
    expect(BIRTHDAY.recipient.turnsAge).toBe(23);
    expect(BIRTHDAY.recipient.birthdayISO).toBe('2026-10-17');
    expect(BIRTHDAY.sender.name).toBe('Anant Agrawal');
    expect(BIRTHDAY.sender.signature).toBe('Anant');
  });

  it('should resolve every photo tag in story configuration to a valid photo manifest item', () => {
    // Ch01
    expect(getPhotoByTag(BIRTHDAY.story.ch01.heroTag)).toBeDefined();
    expect(getPhotoByTag(BIRTHDAY.story.ch01.altTag)).toBeDefined();

    // Ch02
    expect(getPhotoByTag(BIRTHDAY.story.ch02.photoTag)).toBeDefined();

    // Ch03
    BIRTHDAY.story.ch03.cards.forEach((card) => {
      if (card.photoTag) {
        expect(getPhotoByTag(card.photoTag)).toBeDefined();
      }
    });

    // Ch04 Fairy Lights
    BIRTHDAY.story.ch04.photoTags.forEach((tag) => {
      expect(getPhotoByTag(tag)).toBeDefined();
    });

    // Ch05 Photobooth
    BIRTHDAY.story.ch05.photoTags.forEach((tag) => {
      expect(getPhotoByTag(tag)).toBeDefined();
    });

    // Ch06 Ordinary Days
    BIRTHDAY.story.ch06.memories.forEach((mem) => {
      expect(getPhotoByTag(mem.primaryTag)).toBeDefined();
      mem.supportingTags.forEach((tag) => {
        expect(getPhotoByTag(tag)).toBeDefined();
      });
    });

    // Ch07
    expect(getPhotoByTag(BIRTHDAY.story.ch07.insetPhotoTag)).toBeDefined();

    // Ch08
    expect(getPhotoByTag(BIRTHDAY.story.ch08.photoTag)).toBeDefined();
    expect(getPhotoByTag(BIRTHDAY.story.ch08.footerPhotoTag)).toBeDefined();

    // Ch09
    expect(getPhotoByTag(BIRTHDAY.story.ch09.coverThumbnailTag)).toBeDefined();

    // Ch10
    expect(getPhotoByTag(BIRTHDAY.story.ch10.portraitPhotoTag)).toBeDefined();
    expect(getPhotoByTag(BIRTHDAY.story.ch10.illustratedArtTag)).toBeDefined();
  });

  it('should verify the letter is explicitly romantic and contains genuine declarations of love', () => {
    const letter = BIRTHDAY.story.ch08.letter;
    expect(letter.greeting).toBe('My Aanya,');
    expect(letter.subgreeting).toBe('Happy birthday, my love.');
    expect(letter.signature).toBe('Anant');

    const fullLetterText = letter.paragraphs.join(' ');
    expect(fullLetterText).toContain('I love you');
    expect(fullLetterText).toContain('I will always try to be there beside you');
    expect(fullLetterText).not.toContain('lorem ipsum');
    expect(fullLetterText).not.toContain('good friend'); // Must not be the old generic friendship letter
  });

  it('should not contain em dashes in the visible prose per Section 02A & 06', () => {
    const checkText = (text: string) => {
      expect(text.includes('—')).toBe(false);
    };

    BIRTHDAY.story.ch01.leadText.forEach(checkText);
    BIRTHDAY.story.ch02.paragraphs.forEach(checkText);
    BIRTHDAY.story.ch03.cards.forEach((c) => checkText(c.text));
    BIRTHDAY.story.ch04.lines.forEach(checkText);
    BIRTHDAY.story.ch06.shortTexts.forEach(checkText);
    BIRTHDAY.story.ch08.letter.paragraphs.forEach(checkText);
    BIRTHDAY.story.ch10.lines.forEach(checkText);
  });
});
