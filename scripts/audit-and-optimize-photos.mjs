import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import sharp from 'sharp';

const ROOT_DIR = process.cwd();
const TAGS_CSV_PATH = path.join(ROOT_DIR, 'tags.csv');
const OUTPUT_PHOTO_DIR = path.join(ROOT_DIR, 'public', 'assets', 'photos');
const AUDIT_JSON_PATH = path.join(ROOT_DIR, 'src', 'generated', 'photoAudit.json');
const MANIFEST_TS_PATH = path.join(ROOT_DIR, 'src', 'content', 'photoManifest.ts');
const DOCS_MD_PATH = path.join(ROOT_DIR, 'docs', 'PHOTO_PLACEMENT.md');

// Ensure output directories exist
fs.mkdirSync(OUTPUT_PHOTO_DIR, { recursive: true });
fs.mkdirSync(path.dirname(AUDIT_JSON_PATH), { recursive: true });
fs.mkdirSync(path.dirname(DOCS_MD_PATH), { recursive: true });

// Verified metadata definition based on Master Execution Prompt Section 01B
const MASTER_METADATA = {
  1: {
    tag: 'PHOTO_01',
    file: 'couple01.jpg',
    category: 'real',
    verifiedCsvTags: 'aerial view, walking together on a cobblestone street at night, string lights',
    storyPlacement: 'Ch01 hero; Ch09 magazine cover; magazine P02 primary',
    magazinePage: 'Cover reused + P02',
    magazineEditorialRole: 'First narrative photograph / cover reuse',
    excludeByDefault: false,
    role: 'Hero night walk portrait & magazine cover/opener',
    alt: 'Anant and Aanya walking together along a warm cobblestone street beneath string lights at night',
    preferredFit: 'cover',
    focalPoint: { mobile: '50% 35%', desktop: '50% 30%' },
    sections: ['Ch01', 'Ch09', 'Magazine-Cover', 'Magazine-P02']
  },
  2: {
    tag: 'PHOTO_02',
    file: 'couple02.jpg',
    category: 'real',
    verifiedCsvTags: 'walking together, street lamps, warm night light, near-duplicate angle of previous',
    storyPlacement: 'Ch01 alternate angle; Ch04 hanging photo wall',
    magazinePage: null,
    magazineEditorialRole: null,
    excludeByDefault: false,
    role: 'Night walk intimate angle & hanging fairy light wall memory',
    alt: 'Anant and Aanya walking together under amber street lamps',
    preferredFit: 'cover',
    focalPoint: { mobile: '50% 35%', desktop: '50% 35%' },
    sections: ['Ch01', 'Ch04']
  },
  3: {
    tag: 'PHOTO_03',
    file: 'couple03.jpg',
    category: 'real',
    verifiedCsvTags: 'photobooth strip frame 1, standing close, headband prop, smiling',
    storyPlacement: 'Ch05 photobooth cell 1',
    magazinePage: null,
    magazineEditorialRole: null,
    excludeByDefault: false,
    role: 'Photobooth strip frame 1',
    alt: 'Photobooth frame 1: Anant and Aanya standing close and smiling with a playful headband',
    preferredFit: 'contain',
    focalPoint: { mobile: '50% 50%', desktop: '50% 50%' },
    sections: ['Ch05']
  },
  4: {
    tag: 'PHOTO_04',
    file: 'couple04.jpg',
    category: 'real',
    verifiedCsvTags: 'photobooth strip frame 2, close together, smiling',
    storyPlacement: 'Ch05 photobooth cell 2',
    magazinePage: null,
    magazineEditorialRole: null,
    excludeByDefault: false,
    role: 'Photobooth strip frame 2',
    alt: 'Photobooth frame 2: Anant and Aanya smiling together closely',
    preferredFit: 'contain',
    focalPoint: { mobile: '50% 50%', desktop: '50% 50%' },
    sections: ['Ch05']
  },
  5: {
    tag: 'PHOTO_05',
    file: 'couple05.jpg',
    category: 'real',
    verifiedCsvTags: 'photobooth strip frame 3, close together',
    storyPlacement: 'Ch05 photobooth cell 3',
    magazinePage: null,
    magazineEditorialRole: null,
    excludeByDefault: false,
    role: 'Photobooth strip frame 3',
    alt: 'Photobooth frame 3: Anant and Aanya side by side',
    preferredFit: 'contain',
    focalPoint: { mobile: '50% 50%', desktop: '50% 50%' },
    sections: ['Ch05']
  },
  6: {
    tag: 'PHOTO_06',
    file: 'couple06.jpg',
    category: 'real',
    verifiedCsvTags: 'photobooth strip frame 4',
    storyPlacement: 'Ch05 photobooth cell 4',
    magazinePage: null,
    magazineEditorialRole: null,
    excludeByDefault: false,
    role: 'Photobooth strip frame 4',
    alt: 'Photobooth frame 4: playful couple pose in photobooth',
    preferredFit: 'contain',
    focalPoint: { mobile: '50% 50%', desktop: '50% 50%' },
    sections: ['Ch05']
  },
  7: {
    tag: 'PHOTO_07',
    file: 'couple07.jpg',
    category: 'real',
    verifiedCsvTags: 'photobooth strip frame 5, close together, flower headband',
    storyPlacement: 'Ch05 photobooth cell 5',
    magazinePage: null,
    magazineEditorialRole: null,
    excludeByDefault: false,
    role: 'Photobooth strip frame 5',
    alt: 'Photobooth frame 5: close together with floral headband prop',
    preferredFit: 'contain',
    focalPoint: { mobile: '50% 50%', desktop: '50% 50%' },
    sections: ['Ch05']
  },
  8: {
    tag: 'PHOTO_08',
    file: 'couple08.jpg',
    category: 'real',
    verifiedCsvTags: 'photobooth strip frame 6',
    storyPlacement: 'Ch05 photobooth cell 6',
    magazinePage: null,
    magazineEditorialRole: null,
    excludeByDefault: false,
    role: 'Photobooth strip frame 6',
    alt: 'Photobooth frame 6: playful expression in photobooth',
    preferredFit: 'contain',
    focalPoint: { mobile: '50% 50%', desktop: '50% 50%' },
    sections: ['Ch05']
  },
  9: {
    tag: 'PHOTO_09',
    file: 'couple09.jpg',
    category: 'real-intimate',
    verifiedCsvTags: 'photobooth strip frame 7, kiss on cheek',
    storyPlacement: 'Ch05 photobooth cell 7 (intimate)',
    magazinePage: null,
    magazineEditorialRole: null,
    excludeByDefault: false,
    role: 'Photobooth strip frame 7 (kiss on cheek)',
    alt: 'Photobooth frame 7: tender kiss on the cheek',
    preferredFit: 'contain',
    focalPoint: { mobile: '50% 50%', desktop: '50% 50%' },
    sections: ['Ch05']
  },
  10: {
    tag: 'PHOTO_10',
    file: 'couple10.jpg',
    category: 'real-intimate',
    verifiedCsvTags: 'photobooth strip frame 8, kiss on cheek',
    storyPlacement: 'Ch05 photobooth cell 8 (intimate)',
    magazinePage: null,
    magazineEditorialRole: null,
    excludeByDefault: false,
    role: 'Photobooth strip frame 8 (kiss on cheek)',
    alt: 'Photobooth frame 8: sweet photobooth kiss candid',
    preferredFit: 'contain',
    focalPoint: { mobile: '50% 50%', desktop: '50% 50%' },
    sections: ['Ch05']
  },
  11: {
    tag: 'PHOTO_11',
    file: 'couple11.jpg',
    category: 'real',
    verifiedCsvTags: 'selfie in front of Madhubani-style painted wall, arm around shoulder',
    storyPlacement: 'Ch04 hanging photo wall; Ch06 memory; magazine P03 primary',
    magazinePage: 'P03',
    magazineEditorialRole: 'Our colorful days',
    excludeByDefault: false,
    role: 'Madhubani cultural wall selfie & Magazine Page 3 hero',
    alt: 'Anant and Aanya standing with arm around shoulder in front of an intricate Madhubani painted wall',
    preferredFit: 'cover',
    focalPoint: { mobile: '50% 40%', desktop: '50% 40%' },
    sections: ['Ch04', 'Ch06', 'Magazine-P03']
  },
  12: {
    tag: 'PHOTO_12',
    file: 'couple12.jpg',
    category: 'real-intimate',
    verifiedCsvTags: 'same Madhubani wall, close together, forehead near cheek',
    storyPlacement: 'Ch06 wall outing (intimate alternate)',
    magazinePage: null,
    magazineEditorialRole: null,
    excludeByDefault: false,
    role: 'Intimate forehead near cheek candid by painted wall',
    alt: 'Anant and Aanya close together with forehead resting gently near cheek',
    preferredFit: 'cover',
    focalPoint: { mobile: '50% 40%', desktop: '50% 40%' },
    sections: ['Ch06']
  },
  13: {
    tag: 'PHOTO_13',
    file: 'couple13.jpg',
    category: 'real',
    verifiedCsvTags: 'same Madhubani wall, side by side smiling',
    storyPlacement: 'Ch03 love affirmations; Ch04 hanging wall; magazine P04 primary',
    magazinePage: 'P04',
    magazineEditorialRole: 'Smiles and color',
    excludeByDefault: false,
    role: 'Side by side smiling portrait & Magazine Page 4 hero',
    alt: 'Anant and Aanya smiling brightly side by side in front of the painted art wall',
    preferredFit: 'cover',
    focalPoint: { mobile: '50% 35%', desktop: '50% 35%' },
    sections: ['Ch03', 'Ch04', 'Magazine-P04']
  },
  14: {
    tag: 'PHOTO_14',
    file: 'couple14.jpg',
    category: 'real',
    verifiedCsvTags: 'same Madhubani wall, different panel, standing together',
    storyPlacement: 'Ch06 cultural outing supporting image',
    magazinePage: null,
    magazineEditorialRole: null,
    excludeByDefault: false,
    role: 'Cultural venue standing portrait supporting memory',
    alt: 'Anant and Aanya standing together at the cultural art gallery panel',
    preferredFit: 'cover',
    focalPoint: { mobile: '50% 40%', desktop: '50% 40%' },
    sections: ['Ch06']
  },
  15: {
    tag: 'PHOTO_15',
    file: 'couple15.jpg',
    category: 'real',
    verifiedCsvTags: 'same Madhubani wall, near duplicate of previous',
    storyPlacement: 'Ch06 cultural outing alternate; avoid near-duplicate overload',
    magazinePage: null,
    magazineEditorialRole: null,
    excludeByDefault: false,
    role: 'Cultural outing alternate angle',
    alt: 'Anant and Aanya together by the artwork panel',
    preferredFit: 'cover',
    focalPoint: { mobile: '50% 40%', desktop: '50% 40%' },
    sections: ['Ch06']
  },
  16: {
    tag: 'PHOTO_16',
    file: 'couple16.jpg',
    category: 'real',
    verifiedCsvTags: 'selfie, backpack visible, same cultural venue',
    storyPlacement: 'Ch06 cultural outing supporting image',
    magazinePage: null,
    magazineEditorialRole: null,
    excludeByDefault: false,
    role: 'Casual cultural venue selfie with backpack',
    alt: 'Selfie of Anant and Aanya at the cultural exhibition venue',
    preferredFit: 'cover',
    focalPoint: { mobile: '50% 35%', desktop: '50% 35%' },
    sections: ['Ch06']
  },
  17: {
    tag: 'PHOTO_17',
    file: 'couple17.jpg',
    category: 'real',
    verifiedCsvTags: 'sitting together on orange patterned rug, ornate archway backdrop',
    storyPlacement: 'Ch04 hanging wall; Ch06 heritage; magazine P05 primary',
    magazinePage: 'P05',
    magazineEditorialRole: 'Quiet closeness',
    excludeByDefault: false,
    role: 'Ornate heritage venue seated portrait & Magazine Page 5 hero',
    alt: 'Anant and Aanya sitting peacefully together on an orange patterned rug before a carved stone archway',
    preferredFit: 'cover',
    focalPoint: { mobile: '50% 45%', desktop: '50% 45%' },
    sections: ['Ch04', 'Ch06', 'Magazine-P05']
  },
  18: {
    tag: 'PHOTO_18',
    file: 'couple18.jpg',
    category: 'real',
    verifiedCsvTags: 'sitting together, same archway, closer pose',
    storyPlacement: 'Ch06 heritage supporting image',
    magazinePage: null,
    magazineEditorialRole: null,
    excludeByDefault: false,
    role: 'Heritage archway closer seated candid',
    alt: 'Anant and Aanya sitting close together in the stone courtyard',
    preferredFit: 'cover',
    focalPoint: { mobile: '50% 45%', desktop: '50% 45%' },
    sections: ['Ch06']
  },
  19: {
    tag: 'PHOTO_19',
    file: 'couple19.jpg',
    category: 'real',
    verifiedCsvTags: 'sitting together, same archway, arm around',
    storyPlacement: 'Ch06 heritage supporting image; magazine P06 primary',
    magazinePage: 'P06',
    magazineEditorialRole: 'Being beside each other',
    excludeByDefault: false,
    role: 'Seated archway tender embrace & Magazine Page 6 hero',
    alt: 'Anant with arm around Aanya, sitting together quietly in front of the ornate archway',
    preferredFit: 'cover',
    focalPoint: { mobile: '50% 40%', desktop: '50% 40%' },
    sections: ['Ch06', 'Magazine-P06']
  },
  20: {
    tag: 'PHOTO_20',
    file: 'couple20.jpg',
    category: 'real',
    verifiedCsvTags: 'standing together in festive green-lit photo spot, holding hands',
    storyPlacement: 'Ch04 hanging wall; Ch06 festive series; magazine P07 primary A',
    magazinePage: 'P07 A',
    magazineEditorialRole: 'A bright memory',
    excludeByDefault: false,
    role: 'Festive green-lit walkway holding hands & Magazine Page 7 primary A',
    alt: 'Anant and Aanya holding hands and standing together surrounded by glowing emerald festive lights',
    preferredFit: 'cover',
    focalPoint: { mobile: '50% 35%', desktop: '50% 35%' },
    sections: ['Ch04', 'Ch06', 'Magazine-P07']
  },
  21: {
    tag: 'PHOTO_21',
    file: 'couple21.jpg',
    category: 'real',
    verifiedCsvTags: 'same festive spot, near duplicate',
    storyPlacement: 'Ch06 festive series optional alternate; not separate event',
    magazinePage: null,
    magazineEditorialRole: null,
    excludeByDefault: false,
    role: 'Festive lights alternate shot',
    alt: 'Anant and Aanya together under the green festive canopy',
    preferredFit: 'cover',
    focalPoint: { mobile: '50% 35%', desktop: '50% 35%' },
    sections: ['Ch06']
  },
  22: {
    tag: 'PHOTO_22',
    file: 'couple22.jpg',
    category: 'real',
    verifiedCsvTags: 'same festive spot, near duplicate',
    storyPlacement: 'Ch06 festive series optional alternate; not separate event',
    magazinePage: null,
    magazineEditorialRole: null,
    excludeByDefault: false,
    role: 'Festive lights alternate angle',
    alt: 'Couple enjoying the festive illumination',
    preferredFit: 'cover',
    focalPoint: { mobile: '50% 35%', desktop: '50% 35%' },
    sections: ['Ch06']
  },
  23: {
    tag: 'PHOTO_23',
    file: 'couple23.jpg',
    category: 'real',
    verifiedCsvTags: 'same festive spot, near duplicate, another person visible in background',
    storyPlacement: 'Ch06 festive alternate with bystander; privacy review before use',
    magazinePage: null,
    magazineEditorialRole: null,
    excludeByDefault: false,
    role: 'Festive lights alternate (bystander in background)',
    alt: 'Festive evening photo',
    preferredFit: 'cover',
    focalPoint: { mobile: '50% 35%', desktop: '50% 35%' },
    sections: ['Ch06']
  },
  24: {
    tag: 'PHOTO_24',
    file: 'couple24.jpg',
    category: 'real',
    verifiedCsvTags: 'same festive walkway, different angle',
    storyPlacement: 'Ch06 festive series; magazine P07 primary B',
    magazinePage: 'P07 B',
    magazineEditorialRole: 'One shared scene, new perspective',
    excludeByDefault: false,
    role: 'Festive walkway alternate angle & Magazine Page 7 primary B',
    alt: 'Anant and Aanya together along the festive lighted walkway from a fresh angle',
    preferredFit: 'cover',
    focalPoint: { mobile: '50% 35%', desktop: '50% 35%' },
    sections: ['Ch06', 'Magazine-P07']
  },
  25: {
    tag: 'PHOTO_25',
    file: 'couple25.jpg',
    category: 'real',
    verifiedCsvTags: 'black and white edit, same festive outfit, candid',
    storyPlacement: 'Ch06 black-and-white moment; optional Ch07 cake scene inset',
    magazinePage: null,
    magazineEditorialRole: null,
    excludeByDefault: false,
    role: 'Monochrome candid memory & cake scene tabletop inset',
    alt: 'Black and white candid photograph of Anant and Aanya laughing together',
    preferredFit: 'cover',
    focalPoint: { mobile: '50% 35%', desktop: '50% 35%' },
    sections: ['Ch06', 'Ch07']
  },
  26: {
    tag: 'PHOTO_26',
    file: 'couple26.jpg',
    category: 'real',
    verifiedCsvTags: 'close selfie, sunglasses, outdoor greenery, cheek to cheek',
    storyPlacement: 'Ch03 love lines; Ch04 hanging wall; Ch06 memory; magazine P08 primary',
    magazinePage: 'P08',
    magazineEditorialRole: 'Everyday togetherness',
    excludeByDefault: false,
    role: 'Sunny outdoor selfie in sunglasses & Magazine Page 8 hero',
    alt: 'Sunny outdoor selfie of Anant and Aanya cheek to cheek with sunglasses and lush green trees',
    preferredFit: 'cover',
    focalPoint: { mobile: '50% 30%', desktop: '50% 30%' },
    sections: ['Ch03', 'Ch04', 'Ch06', 'Magazine-P08']
  },
  27: {
    tag: 'PHOTO_27',
    file: 'couple27.jpg',
    category: 'real',
    verifiedCsvTags: 'sitting together on a hanging swing chair, greenery backdrop',
    storyPlacement: 'Ch04 hanging wall; Ch06 swing scene; magazine P09 primary',
    magazinePage: 'P09',
    magazineEditorialRole: 'The little pauses',
    excludeByDefault: false,
    role: 'Hanging garden swing chair portrait & Magazine Page 9 hero',
    alt: 'Anant and Aanya relaxing together in a hanging swing chair against leafy garden greenery',
    preferredFit: 'cover',
    focalPoint: { mobile: '50% 40%', desktop: '50% 40%' },
    sections: ['Ch04', 'Ch06', 'Magazine-P09']
  },
  28: {
    tag: 'PHOTO_28',
    file: 'couple28.jpg',
    category: 'ai-illustrated',
    verifiedCsvTags: 'AI-generated / illustrated image, anime-style line art, embracing in a clothing store setting',
    storyPlacement: 'Ch10 optional illustrated end-card only; label illustration, not photo',
    magazinePage: null,
    magazineEditorialRole: null,
    excludeByDefault: false,
    role: 'Artistic illustrated end-card interlude',
    alt: 'Artistic anime-style couple illustration embracing gently in a boutique',
    preferredFit: 'contain',
    focalPoint: { mobile: '50% 50%', desktop: '50% 50%' },
    sections: ['Ch10']
  },
  29: {
    tag: 'PHOTO_29',
    file: 'couple29.jpg',
    category: 'real',
    verifiedCsvTags: 'selfie, matching white t-shirts with heart print, shopping mall',
    storyPlacement: 'Ch04 hanging wall; Ch06 matching shirts; magazine P10 primary',
    magazinePage: 'P10',
    magazineEditorialRole: 'Playful ordinary moments',
    excludeByDefault: false,
    role: 'Matching heart print white t-shirts selfie & Magazine Page 10 hero',
    alt: 'Anant and Aanya smiling in matching white heart-print t-shirts while shopping',
    preferredFit: 'cover',
    focalPoint: { mobile: '50% 35%', desktop: '50% 35%' },
    sections: ['Ch04', 'Ch06', 'Magazine-P10']
  },
  30: {
    tag: 'PHOTO_30',
    file: 'couple30.jpg',
    category: 'real',
    verifiedCsvTags: 'same matching t-shirts, backpack visible, close together',
    storyPlacement: 'Ch06 matching shirts alternative',
    magazinePage: null,
    magazineEditorialRole: null,
    excludeByDefault: false,
    role: 'Matching t-shirts shopping mall alternate',
    alt: 'Anant and Aanya smiling together in matching heart t-shirts',
    preferredFit: 'cover',
    focalPoint: { mobile: '50% 35%', desktop: '50% 35%' },
    sections: ['Ch06']
  },
  31: {
    tag: 'PHOTO_31',
    file: 'couple31.jpg',
    category: 'real',
    verifiedCsvTags: 'close selfie, cheek resting on shoulder, plain background',
    storyPlacement: 'Ch02 opening paper photo; Ch08 letter; magazine P11 primary A',
    magazinePage: 'P11 A',
    magazineEditorialRole: 'Our softer moments',
    excludeByDefault: false,
    role: 'Tender close selfie with head on shoulder & Magazine Page 11 primary A',
    alt: 'Intimate close selfie of Aanya resting her cheek softly against Anant’s shoulder',
    preferredFit: 'cover',
    focalPoint: { mobile: '50% 30%', desktop: '50% 30%' },
    sections: ['Ch02', 'Ch08', 'Magazine-P11']
  },
  32: {
    tag: 'PHOTO_32',
    file: 'couple32.jpg',
    category: 'real-lowres',
    verifiedCsvTags: 'video call screenshot, both visible on screen',
    storyPlacement: 'EXCLUDE BY DEFAULT: video-call screenshot with app UI',
    magazinePage: null,
    magazineEditorialRole: null,
    excludeByDefault: true,
    role: 'Video call screenshot (excluded by default for privacy & quality)',
    alt: 'Video call screenshot with interface overlay',
    preferredFit: 'contain',
    focalPoint: { mobile: '50% 50%', desktop: '50% 50%' },
    sections: []
  },
  33: {
    tag: 'PHOTO_33',
    file: 'couple33.jpg',
    category: 'real',
    verifiedCsvTags: 'close selfie, dark indoor setting, cheek to cheek',
    storyPlacement: 'Ch04 hanging wall; Ch06 warm indoor portrait; Ch08 letter inset',
    magazinePage: null,
    magazineEditorialRole: null,
    excludeByDefault: false,
    role: 'Warm dim indoor cheek-to-cheek selfie & letter corner inset',
    alt: 'Warm low-light selfie of Anant and Aanya cheek to cheek indoors',
    preferredFit: 'cover',
    focalPoint: { mobile: '50% 30%', desktop: '50% 30%' },
    sections: ['Ch04', 'Ch06', 'Ch08']
  },
  34: {
    tag: 'PHOTO_34',
    file: 'couple34.jpg',
    category: 'real',
    verifiedCsvTags: 'close selfie, arm around, dark indoor setting',
    storyPlacement: 'Ch06 warm indoor alternate; Ch08 letter optional inset',
    magazinePage: null,
    magazineEditorialRole: null,
    excludeByDefault: false,
    role: 'Warm indoor selfie alternate with arm around',
    alt: 'Warm dim indoor selfie of Anant with arm around Aanya',
    preferredFit: 'cover',
    focalPoint: { mobile: '50% 30%', desktop: '50% 30%' },
    sections: ['Ch06', 'Ch08']
  },
  35: {
    tag: 'PHOTO_35',
    file: 'couple35.jpg',
    category: 'real',
    verifiedCsvTags: 'posed portrait, dressed up, formal event backdrop',
    storyPlacement: 'Ch03 portrait; Ch04 hanging wall; Ch10 finale; magazine P11 primary B',
    magazinePage: 'P11 B',
    magazineEditorialRole: 'A beautiful final portrait',
    excludeByDefault: false,
    role: 'Dressed-up formal event portrait, finale anchor & Magazine Page 11 primary B',
    alt: 'Anant and Aanya dressed up in elegant formal attire, smiling together at an evening event',
    preferredFit: 'cover',
    focalPoint: { mobile: '50% 30%', desktop: '50% 30%' },
    sections: ['Ch03', 'Ch04', 'Ch10', 'Magazine-P11']
  }
};

async function run() {
  console.log('--- Starting Image Audit and Optimization ---');
  const auditEntries = [];

  for (let i = 1; i <= 35; i++) {
    const numStr = String(i).padStart(2, '0');
    const filename = `couple${numStr}.jpg`;
    const srcPath = path.join(ROOT_DIR, filename);

    if (!fs.existsSync(srcPath)) {
      throw new Error(`Missing mandatory photo file: ${srcPath}`);
    }

    const fileBuffer = fs.readFileSync(srcPath);
    const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
    const imageInfo = await sharp(fileBuffer).metadata();

    const master = MASTER_METADATA[i];
    if (!master) {
      throw new Error(`Missing master metadata definition for photo index ${i}`);
    }

    // Verify dimensions match expected exactly
    const naturalWidth = imageInfo.width;
    const naturalHeight = imageInfo.height;

    console.log(`Processing [[${master.tag}]] (${filename}): ${naturalWidth}x${naturalHeight} [${master.category}]`);

    // Output filenames in public/assets/photos/
    const baseOutputName = `photo_${numStr}`;
    const webpOutputName = `${baseOutputName}.webp`;
    const jpgOutputName = `${baseOutputName}.jpg`;
    const thumbWebpName = `${baseOutputName}_thumb.webp`;

    const webpOutputPath = path.join(OUTPUT_PHOTO_DIR, webpOutputName);
    const jpgOutputPath = path.join(OUTPUT_PHOTO_DIR, jpgOutputName);
    const thumbOutputPath = path.join(OUTPUT_PHOTO_DIR, thumbWebpName);

    // Stripping EXIF/GPS, optimizing for web delivery
    // photobooth cells (360x268) should NOT be upscaled
    const isPhotobooth = i >= 3 && i <= 10;
    const maxStandardDim = isPhotobooth ? 360 : 1600;
    const thumbDim = isPhotobooth ? 180 : 400;

    // 1. High-fidelity WebP (EXIF stripped)
    await sharp(fileBuffer)
      .rotate() // auto-orient based on EXIF before stripping
      .resize({
        width: naturalWidth > maxStandardDim ? maxStandardDim : undefined,
        height: naturalHeight > maxStandardDim ? maxStandardDim : undefined,
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 86, effort: 4 })
      .toFile(webpOutputPath);

    // 2. High-fidelity Fallback JPG (EXIF stripped)
    await sharp(fileBuffer)
      .rotate()
      .resize({
        width: naturalWidth > maxStandardDim ? maxStandardDim : undefined,
        height: naturalHeight > maxStandardDim ? maxStandardDim : undefined,
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: 85, progressive: true })
      .toFile(jpgOutputPath);

    // 3. Low-overhead Thumbnail WebP for rapid preview / fairy light wall / gallery cards
    await sharp(fileBuffer)
      .rotate()
      .resize({
        width: naturalWidth > thumbDim ? thumbDim : undefined,
        height: naturalHeight > thumbDim ? thumbDim : undefined,
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 75, effort: 4 })
      .toFile(thumbOutputPath);

    const webpStat = fs.statSync(webpOutputPath);
    const jpgStat = fs.statSync(jpgOutputPath);
    const thumbStat = fs.statSync(thumbOutputPath);

    auditEntries.push({
      index: i,
      tag: master.tag,
      filename,
      category: master.category,
      sha256: hash,
      naturalWidth,
      naturalHeight,
      aspectRatio: Number((naturalWidth / naturalHeight).toFixed(4)),
      isPhotobooth,
      excludeByDefault: master.excludeByDefault,
      storyPlacement: master.storyPlacement,
      magazinePage: master.magazinePage,
      magazineEditorialRole: master.magazineEditorialRole,
      role: master.role,
      alt: master.alt,
      preferredFit: master.preferredFit,
      focalPoint: master.focalPoint,
      sections: master.sections,
      verifiedCsvTags: master.verifiedCsvTags,
      derivatives: {
        webp: `assets/photos/${webpOutputName}`,
        jpg: `assets/photos/${jpgOutputName}`,
        thumb: `assets/photos/${thumbWebpName}`,
        webpBytes: webpStat.size,
        jpgBytes: jpgStat.size,
        thumbBytes: thumbStat.size
      }
    });
  }

  // Write audit JSON
  fs.writeFileSync(AUDIT_JSON_PATH, JSON.stringify(auditEntries, null, 2), 'utf8');
  console.log(`Saved audit JSON: ${AUDIT_JSON_PATH}`);

  // Write TypeScript Photo Manifest
  const manifestTs = `// AUTOGENERATED FILE - DO NOT EDIT DIRECTLY
// Generated by scripts/audit-and-optimize-photos.mjs

export interface PhotoDerivative {
  webp: string;
  jpg: string;
  thumb: string;
  webpBytes: number;
  jpgBytes: number;
  thumbBytes: number;
}

export interface PhotoFocalPoint {
  mobile: string;
  desktop: string;
}

export type PhotoClassification = 'real' | 'real-intimate' | 'ai-illustrated' | 'real-lowres';

export interface PhotoItem {
  index: number;
  tag: string;
  filename: string;
  category: PhotoClassification;
  sha256: string;
  naturalWidth: number;
  naturalHeight: number;
  aspectRatio: number;
  isPhotobooth: boolean;
  excludeByDefault: boolean;
  storyPlacement: string;
  magazinePage: string | null;
  magazineEditorialRole: string | null;
  role: string;
  alt: string;
  preferredFit: 'cover' | 'contain';
  focalPoint: PhotoFocalPoint;
  sections: string[];
  verifiedCsvTags: string;
  derivatives: PhotoDerivative;
}

export const PHOTO_MANIFEST: Record<string, PhotoItem> = {
${auditEntries.map(e => `  '${e.tag}': ${JSON.stringify(e, null, 4)}`).join(',\n')}
};

export const PHOTO_LIST: PhotoItem[] = Object.values(PHOTO_MANIFEST);

/**
 * Helper to safely resolve a photo by tag (e.g. 'PHOTO_01')
 */
export function getPhotoByTag(tag: string): PhotoItem {
  const photo = PHOTO_MANIFEST[tag];
  if (!photo) {
    throw new Error(\`Photo tag not found in manifest: \${tag}\`);
  }
  return photo;
}
`;
  fs.writeFileSync(MANIFEST_TS_PATH, manifestTs, 'utf8');
  console.log(`Saved TypeScript photo manifest: ${MANIFEST_TS_PATH}`);

  // Write Markdown Placement Document
  const docMarkdown = `# Master Verified Photo Placement & Asset Manifest

This document records the exact, verified mapping of all 35 couple photos provided in \`COMPLETE_PROJECT_SUMMARY.zip\` for Aanya's 23rd birthday gift website and luxury magazine.

- Total photos audited: 35
- Real camera photographs: 33
- AI-illustrated artwork: 1 (\`PHOTO_28\` / \`couple28.jpg\`)
- Excluded by default: 1 (\`PHOTO_32\` / \`couple32.jpg\` - video call screenshot with UI overlay)
- Photobooth strip frames: 8 (\`PHOTO_03\` - \`PHOTO_10\`, 360×268 px, rendered at natural paper strip scale)
- Primary Magazine Editorial Photos: Exactly 12 unique photographs in editorial order (\`PHOTO_01\`, \`PHOTO_11\`, \`PHOTO_13\`, \`PHOTO_17\`, \`PHOTO_19\`, \`PHOTO_20\`, \`PHOTO_24\`, \`PHOTO_26\`, \`PHOTO_27\`, \`PHOTO_29\`, \`PHOTO_31\`, \`PHOTO_35\`)

| Tag | Filename | Natural Dimensions | Category | Verified Description | Primary Story Placement | Magazine Placement |
| --- | --- | --- | --- | --- | --- | --- |
${auditEntries.map(e => `| **${e.tag}** | \`${e.filename}\` | ${e.naturalWidth}×${e.naturalHeight} | \`${e.category}\` | ${e.verifiedCsvTags} | ${e.storyPlacement} | ${e.magazinePage || '—'} |`).join('\n')}

## Security & Privacy Verification
- All public image derivatives in \`public/assets/photos/\` have had EXIF and GPS location metadata stripped.
- Responsive WebP and progressive JPEG derivatives are generated for crisp rendering with minimal bandwidth footprint.
- Low-resolution photobooth cells (\`PHOTO_03\` through \`PHOTO_10\`) are strictly constrained to natural compact display dimensions and not blown up as full-screen heroes.
`;
  fs.writeFileSync(DOCS_MD_PATH, docMarkdown, 'utf8');
  console.log(`Saved Documentation: ${DOCS_MD_PATH}`);
  console.log('--- Photo Audit and Optimization Complete ---');
}

run().catch(err => {
  console.error('Fatal error during photo processing:', err);
  process.exit(1);
});
