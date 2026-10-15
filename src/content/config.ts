// Central Content & Experience Configuration
// Recipient and sender details, exact messages, chapter storyboards, and editorial settings.
// Edit this file to update names, messages, or configurations without touching UI code.

export interface BirthdayConfig {
  recipient: {
    fullName: string;
    displayName: string;
    turnsAge: number;
    birthdayISO: string;
    formattedBirthday: string;
  };
  sender: {
    name: string;
    signature: string;
  };
  experiences: {
    storyEnabled: boolean;
    magazineEnabled: boolean;
    autoOpenMagazine: boolean;
  };
  story: {
    ch00: {
      tagline: string;
      ctaText: string;
    };
    ch01: {
      heroTag: string;
      altTag: string;
      headline: string;
      subline: string;
      leadText: string[];
      actionText: string;
    };
    ch02: {
      photoTag: string;
      greeting: string;
      paragraphs: string[];
      actionText: string;
    };
    ch03: {
      title: string;
      subtitle: string;
      cards: Array<{
        id: number;
        teaser: string;
        text: string;
        photoTag: string | null;
      }>;
    };
    ch04: {
      title: string;
      lines: string[];
      photoTags: string[];
    };
    ch05: {
      title: string;
      caption: string;
      photoTags: string[];
    };
    ch06: {
      title: string;
      shortTexts: string[];
      memories: Array<{
        id: string;
        title: string;
        primaryTag: string;
        supportingTags: string[];
        caption: string;
      }>;
    };
    ch07: {
      introText: string;
      promptText: string;
      blowTapText: string;
      blowMicText: string;
      revealText: string;
      continueText: string;
      relightText: string;
      insetPhotoTag: string;
    };
    ch08: {
      sealText: string;
      openCta: string;
      photoTag: string;
      footerPhotoTag: string;
      letter: {
        greeting: string;
        subgreeting: string;
        paragraphs: string[];
        closing: string;
        signature: string;
      };
    };
    ch09: {
      title: string;
      body: string[];
      coverThumbnailTag: string;
      primaryButtonText: string;
      secondaryButtonText: string;
    };
    ch10: {
      headline: string;
      lines: string[];
      closingTitle: string;
      closingSignature: string;
      portraitPhotoTag: string;
      illustratedArtTag: string;
      buttonRereadLetter: string;
      buttonOpenMagazine: string;
      buttonStartAgain: string;
    };
  };
  magazine: {
    title: string;
    subtitle: string;
    credit: string;
    totalLogicalPages: number;
    primaryTags: string[];
    entryRequiresClick: boolean;
    mode: 'auto' | 'single' | 'spread';
    quality: 'auto' | 'high' | 'balanced' | 'lightweight';
  };
  accessibility: {
    honorReducedMotion: boolean;
    disableAutoplay: boolean;
  };
  features: {
    microphoneOptional: boolean;
    hapticsOptional: boolean;
    audioOptional: boolean;
  };
}

export const BIRTHDAY: BirthdayConfig = {
  recipient: {
    fullName: 'Aanya Sharma',
    displayName: 'Aanya',
    turnsAge: 23,
    birthdayISO: '2026-10-17',
    formattedBirthday: '17 October'
  },
  sender: {
    name: 'Anant Agrawal',
    signature: 'Anant'
  },
  experiences: {
    storyEnabled: true,
    magazineEnabled: true,
    autoOpenMagazine: false
  },
  story: {
    ch00: {
      tagline: 'Something made just for you.',
      ctaText: 'Open your birthday surprise'
    },
    ch01: {
      heroTag: 'PHOTO_01',
      altTag: 'PHOTO_02',
      headline: 'AANYA',
      subline: 'Happy 23rd Birthday, my love.',
      leadText: [
        'There are so many ways to say I love you.',
        'I made you one more.'
      ],
      actionText: 'Come with me'
    },
    ch02: {
      photoTag: 'PHOTO_31',
      greeting: 'Hi, love.',
      paragraphs: [
        'I wanted your birthday to feel a little different this time.',
        'Not just another message on your phone.',
        'Something you can open, touch, smile at, and come back to.',
        'Something that reminds you that you are deeply loved.'
      ],
      actionText: 'Continue'
    },
    ch03: {
      title: 'A few things I do not say enough',
      subtitle: 'Tap each card to reveal what is in my heart',
      cards: [
        {
          id: 1,
          teaser: 'The quiet magic in your smile',
          text: 'Whenever you look at me and smile, all the noise in the world just falls away. You bring an effortless warmth into my life that nothing else ever could, and loving you is the easiest, most natural thing I have ever done.',
          photoTag: 'PHOTO_13'
        },
        {
          id: 2,
          teaser: 'Our unwritten, quiet rhythm',
          text: 'My absolute favorite moments are the ones we never had to plan, sitting together in comfortable silence, reaching for your hand, and realizing that home is not a place at all; it is being right beside you.',
          photoTag: 'PHOTO_26'
        },
        {
          id: 3,
          teaser: 'The shelter of your presence',
          text: 'In a world that is always rushing, you are my peace, my anchor, and my gentle calm. Just knowing you are in my life makes every ordinary day feel precious, rare, and whole.',
          photoTag: 'PHOTO_17'
        },
        {
          id: 4,
          teaser: 'Every tomorrow I picture',
          text: 'When I look ahead into the years to come, every single dream I have has your hand in mine. I want to stand beside you through every season, celebrating your victories, cheering your dreams, and holding you through everything.',
          photoTag: 'PHOTO_27'
        },
        {
          id: 5,
          teaser: 'The grace and warmth in who you are',
          text: 'I fall more in love with your mind, your kindness, and your soft, radiant heart every single day. Watching you grow into this incredible woman at 23 is a blessing I will cherish my whole life.',
          photoTag: 'PHOTO_31'
        },
        {
          id: 6,
          teaser: 'My eternal, unequivocal truth',
          text: 'No matter how many times I say it, words will never be large enough to hold what I feel for you. I love you, Aanya. Deeply, wholly, without hesitation, today and for all the days to come.',
          photoTag: 'PHOTO_35'
        }
      ]
    },
    ch04: {
      title: 'Pieces of us',
      lines: [
        'Pieces of us.',
        'A thousand little reasons to smile.',
        'I would choose these moments with you again.'
      ],
      photoTags: [
        'PHOTO_02',
        'PHOTO_11',
        'PHOTO_13',
        'PHOTO_17',
        'PHOTO_20',
        'PHOTO_26',
        'PHOTO_27',
        'PHOTO_29',
        'PHOTO_33',
        'PHOTO_35'
      ]
    },
    ch05: {
      title: 'Our little photobooth',
      caption: 'Some pictures do not need perfect lighting. Just us.',
      photoTags: [
        'PHOTO_03',
        'PHOTO_04',
        'PHOTO_05',
        'PHOTO_06',
        'PHOTO_07',
        'PHOTO_08',
        'PHOTO_09',
        'PHOTO_10'
      ]
    },
    ch06: {
      title: 'And then there are all the ordinary days',
      shortTexts: [
        'The unexpected pictures.',
        'The in-between moments.',
        'The days I wish I could pause for a little longer.'
      ],
      memories: [
        {
          id: 'cultural-wall',
          title: 'The Painted Wall',
          primaryTag: 'PHOTO_12',
          supportingTags: ['PHOTO_14', 'PHOTO_16'],
          caption: 'Surrounded by colors, but looking right at you.'
        },
        {
          id: 'heritage-arch',
          title: 'Quiet Heritage',
          primaryTag: 'PHOTO_18',
          supportingTags: ['PHOTO_19'],
          caption: 'In the stillness of stone and time, simply sitting beside you.'
        },
        {
          id: 'festive-lights',
          title: 'Festive Lights',
          primaryTag: 'PHOTO_20',
          supportingTags: ['PHOTO_24', 'PHOTO_25'],
          caption: 'Green canopies, festive evenings, and the feeling of holding your hand.'
        },
        {
          id: 'garden-swing',
          title: 'Garden Pause',
          primaryTag: 'PHOTO_27',
          supportingTags: [],
          caption: 'Gently swaying on the garden swing, letting the world slow down.'
        },
        {
          id: 'matching-shirts',
          title: 'Matching Hearts',
          primaryTag: 'PHOTO_29',
          supportingTags: ['PHOTO_30'],
          caption: 'Unfiltered mall laughs in matching shirts.'
        },
        {
          id: 'quiet-indoor',
          title: 'Warm Indoor Light',
          primaryTag: 'PHOTO_33',
          supportingTags: ['PHOTO_34'],
          caption: 'The quiet indoor hours where nothing else matters.'
        }
      ]
    },
    ch07: {
      introText: 'Before this year begins...',
      promptText: 'Close your eyes. Make a wish.',
      blowTapText: 'Blow out the candles',
      blowMicText: 'Use my microphone',
      revealText: 'Happy birthday, my love. I hope the wish you made finds its way to you.',
      continueText: 'Continue',
      relightText: 'Relight candles',
      insetPhotoTag: 'PHOTO_25'
    },
    ch08: {
      sealText: 'For Aanya',
      openCta: 'Open your letter',
      photoTag: 'PHOTO_31',
      footerPhotoTag: 'PHOTO_33',
      letter: {
        greeting: 'My Aanya,',
        subgreeting: 'Happy birthday, my love.',
        paragraphs: [
          'I wanted to do something more than send you a message this year. I wanted to make a little place filled with warmth, our pictures, and the words I never want you to forget.',
          'I love you. I love having you in my life, and I love the thought that there are still so many ordinary days and beautiful moments waiting for us. Even the simplest time together means so much to me.',
          'On your birthday, I want you to feel celebrated, understood, and loved. I hope this next year brings you happiness, peace, laughter, good opportunities, and the kind of memories you will want to keep forever. More than anything, I want it to be a year filled with even more love than the last.',
          'And I want you to know something very clearly: I will always try to be there beside you. In the easy moments, in the difficult ones, and in all those little moments that make a life. You will never have to wonder whether I care. I do, deeply.',
          'I cannot promise that every day will be perfect, but I can promise that my love for you is real, and that I will keep choosing kindness, honesty, effort, and us.',
          'I hope you smile while opening this. I hope you know how precious you are to me. And when this page ends, I hope that feeling stays with you.',
          'Happy 23rd birthday, Aanya.',
          'I love you, today and every day after.'
        ],
        closing: 'Always yours,',
        signature: 'Anant'
      }
    },
    ch09: {
      title: 'There is one more thing.',
      body: [
        'I made you something you can open whenever you miss these moments.',
        'A little magazine, made just for you.'
      ],
      coverThumbnailTag: 'PHOTO_01',
      primaryButtonText: 'Open your magazine',
      secondaryButtonText: 'Not now, keep reading'
    },
    ch10: {
      headline: 'Happy Birthday, Aanya.',
      lines: [
        'You deserve so much happiness, love, and beautiful things this year.',
        'I will always be by your side, loving you and cheering for you.',
        'May this next year bring us even more love than the last.',
        'I love you. So much.'
      ],
      closingTitle: 'Forever cheering for you,',
      closingSignature: 'Anant',
      portraitPhotoTag: 'PHOTO_35',
      illustratedArtTag: 'PHOTO_28',
      buttonRereadLetter: 'Read my letter again',
      buttonOpenMagazine: 'Open your magazine',
      buttonStartAgain: 'Start again'
    }
  },
  magazine: {
    title: 'THE LITTLE THINGS THAT MAKE US',
    subtitle: 'A birthday keepsake',
    credit: 'With love, Anant',
    totalLogicalPages: 12,
    primaryTags: [
      'PHOTO_01',
      'PHOTO_11',
      'PHOTO_13',
      'PHOTO_17',
      'PHOTO_19',
      'PHOTO_20',
      'PHOTO_24',
      'PHOTO_26',
      'PHOTO_27',
      'PHOTO_29',
      'PHOTO_31',
      'PHOTO_35'
    ],
    entryRequiresClick: true,
    mode: 'auto',
    quality: 'auto'
  },
  accessibility: {
    honorReducedMotion: true,
    disableAutoplay: true
  },
  features: {
    microphoneOptional: true,
    hapticsOptional: true,
    audioOptional: true
  }
} as const;
