// Central Magazine Pages Definition
// 12 logical editorial pages:
// Page 1: Front cover (PHOTO_01 decorative reuse)
// Pages 2-11: Interior editorial content (12 unique primary source photos across 10 pages; Pages 7 and 11 have 2 photos each)
// Page 12: Back cover (solid burgundy/ivory embossed, decorative closure)

export interface MagazinePageFace {
  pageNumber: number; // 1 to 12
  isCover: boolean;
  isBackCover: boolean;
  side: 'recto' | 'verso'; // 1 is recto (cover), 2 is verso, 3 is recto, etc.
  title: string;
  subtitle?: string;
  pullQuote?: string;
  bodyText?: string;
  caption?: string;
  primaryPhotoTags: string[];
  decorativePhotoTag?: string | null;
  layoutVariant: 
    | 'front-cover'
    | 'editorial-lead'
    | 'single-full'
    | 'single-landscape'
    | 'portrait-gutter'
    | 'two-photo-festive'
    | 'outdoor-candid'
    | 'swing-peace'
    | 'playful-split'
    | 'climax-duo'
    | 'back-cover';
}

export const MAGAZINE_PAGES: MagazinePageFace[] = [
  // Page 1: Front Cover
  {
    pageNumber: 1,
    isCover: true,
    isBackCover: false,
    side: 'recto',
    title: 'THE LITTLE THINGS THAT MAKE US',
    subtitle: 'A birthday keepsake',
    pullQuote: 'AANYA',
    bodyText: 'With love, Anant',
    primaryPhotoTags: [],
    decorativePhotoTag: 'PHOTO_01',
    layoutVariant: 'front-cover'
  },
  // Page 2: Opening note
  {
    pageNumber: 2,
    isCover: false,
    isBackCover: false,
    side: 'verso',
    title: 'A Beginning',
    pullQuote: 'Some of my favourite moments are simply the ones in which I am beside you.',
    bodyText: 'This little book is for the moments we have kept, the smiles we have shared, and the love I want you to feel today. Happy birthday, Aanya.',
    primaryPhotoTags: ['PHOTO_01'],
    layoutVariant: 'editorial-lead'
  },
  // Page 3: Colorful days
  {
    pageNumber: 3,
    isCover: false,
    isBackCover: false,
    side: 'recto',
    title: 'Our Colorful Days',
    caption: 'The pictures that make me smile before I even remember why.',
    primaryPhotoTags: ['PHOTO_11'],
    layoutVariant: 'single-full'
  },
  // Page 4: A smile worth keeping
  {
    pageNumber: 4,
    isCover: false,
    isBackCover: false,
    side: 'verso',
    title: 'Smiles and Color',
    pullQuote: 'If I could keep a few moments in my pocket, I would keep moments like these.',
    primaryPhotoTags: ['PHOTO_13'],
    layoutVariant: 'single-landscape'
  },
  // Page 5: Together, even in stillness
  {
    pageNumber: 5,
    isCover: false,
    isBackCover: false,
    side: 'recto',
    title: 'Quiet Closeness',
    pullQuote: 'I love the kind of comfort where nothing needs to be extraordinary to matter.',
    primaryPhotoTags: ['PHOTO_17'],
    layoutVariant: 'portrait-gutter'
  },
  // Page 6: Closer
  {
    pageNumber: 6,
    isCover: false,
    isBackCover: false,
    side: 'verso',
    title: 'Being Beside Each Other',
    pullQuote: 'Sometimes the best part of a day is just being close to you.',
    primaryPhotoTags: ['PHOTO_19'],
    layoutVariant: 'single-full'
  },
  // Page 7: Lights we walked through
  {
    pageNumber: 7,
    isCover: false,
    isBackCover: false,
    side: 'recto',
    title: 'A Bright Memory',
    pullQuote: 'Another place. Another little moment. One more memory that feels like ours.',
    primaryPhotoTags: ['PHOTO_20', 'PHOTO_24'],
    layoutVariant: 'two-photo-festive'
  },
  // Page 8: The easy everyday
  {
    pageNumber: 8,
    isCover: false,
    isBackCover: false,
    side: 'verso',
    title: 'Everyday Togetherness',
    pullQuote: 'I never want to stop noticing the little things about being together.',
    primaryPhotoTags: ['PHOTO_26'],
    layoutVariant: 'outdoor-candid'
  },
  // Page 9: A place to pause
  {
    pageNumber: 9,
    isCover: false,
    isBackCover: false,
    side: 'recto',
    title: 'The Little Pauses',
    pullQuote: 'There is so much to love about simply sharing a moment.',
    primaryPhotoTags: ['PHOTO_27'],
    layoutVariant: 'swing-peace'
  },
  // Page 10: Just us
  {
    pageNumber: 10,
    isCover: false,
    isBackCover: false,
    side: 'verso',
    title: 'Playful Ordinary Moments',
    pullQuote: 'We do not need perfect poses. I just like seeing us together.',
    primaryPhotoTags: ['PHOTO_29'],
    layoutVariant: 'playful-split'
  },
  // Page 11: The photographs I want to keep
  {
    pageNumber: 11,
    isCover: false,
    isBackCover: false,
    side: 'recto',
    title: 'The Photographs I Want To Keep',
    bodyText: 'Dear Aanya,\nEvery page here is only a picture. What means the most to me is having you in my life. I love you. I want to keep showing up beside you, celebrating your happiness and loving you through the year ahead. May this birthday begin a year that feels kinder, brighter, and even more full of love.\nAlways, Anant.',
    primaryPhotoTags: ['PHOTO_31', 'PHOTO_35'],
    layoutVariant: 'climax-duo'
  },
  // Page 12: Back cover
  {
    pageNumber: 12,
    isCover: false,
    isBackCover: true,
    side: 'verso',
    title: 'Happy Birthday, Aanya.',
    pullQuote: 'I love you.',
    bodyText: 'Anant',
    primaryPhotoTags: [],
    decorativePhotoTag: 'PHOTO_01',
    layoutVariant: 'back-cover'
  }
];

/**
 * Validates that exactly the 12 specified photos appear as primary interior photos
 */
export function getMagazinePrimaryTags(): string[] {
  const tags: string[] = [];
  for (const page of MAGAZINE_PAGES) {
    if (!page.isCover && !page.isBackCover) {
      tags.push(...page.primaryPhotoTags);
    }
  }
  return tags;
}
