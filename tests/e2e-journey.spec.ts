import { test, expect } from '@playwright/test';

test.describe('Aanya Birthday Romantic Journey & Magazine E2E', () => {
  test('Complete emotional story journey, cake blowing, and luxury magazine interaction', async ({ page }, testInfo) => {
    test.setTimeout(90000); // Allow sufficient time for comprehensive 10-chapter journey and 3D interactions
    const isMobile = testInfo.project.name.includes('Mobile');
    const prefix = isMobile ? 'mobile' : 'desktop';

    // 1. Visit root page
    await page.goto('/');
    await expect(page).toHaveTitle(/Aanya • Happy Birthday/);

    // Verify Chapter 00 Invitation screen
    const openBtn = page.getByRole('button', { name: 'Open your birthday surprise' });
    await expect(openBtn).toBeVisible();
    await page.screenshot({ path: `docs/screenshots/${prefix}-00-invitation.png` });

    // 2. Click "Open your birthday surprise"
    await openBtn.click();
    await page.waitForTimeout(500);

    // Verify Chapter 01 Hero
    const heroTitle = page.getByRole('heading', { name: 'AANYA', level: 1 });
    await expect(heroTitle).toBeVisible();
    await expect(page.getByText('Happy 23rd Birthday, my love.')).toBeVisible();
    await page.screenshot({ path: `docs/screenshots/${prefix}-01-hero.png` });

    // Click "Come with me"
    const comeWithMeBtn = page.getByRole('button', { name: 'Come with me' });
    await comeWithMeBtn.click();
    await page.waitForTimeout(600);

    // 3. Chapter 02 Letter Intro
    await expect(page.getByText('Hi, love.')).toBeVisible();
    await expect(page.getByText('Something that reminds you that you are deeply loved.')).toBeVisible();
    await page.screenshot({ path: `docs/screenshots/${prefix}-02-letter-intro.png` });

    // 4. Chapter 03 Love Lines
    const loveLinesSection = page.locator('#chapter-03');
    await loveLinesSection.scrollIntoViewIfNeeded();
    await expect(page.getByText('A few things I do not say enough')).toBeVisible();

    // Toggle card
    const cardBtn = page.getByRole('button', { name: /02\./i }).or(page.getByRole('button', { name: /Tap to reveal note/i }).first());
    if (await cardBtn.isVisible()) {
      await cardBtn.click();
      await page.waitForTimeout(200);
    }
    await page.screenshot({ path: `docs/screenshots/${prefix}-03-love-lines.png` });

    // 5. Chapter 04 Fairy Lights Memory Wall
    const fairyLightsSection = page.locator('#chapter-04');
    await fairyLightsSection.scrollIntoViewIfNeeded();
    await expect(page.getByRole('heading', { name: 'Pieces of us' })).toBeVisible();
    await page.screenshot({ path: `docs/screenshots/${prefix}-04-fairy-lights.png` });

    // Click first hanging photo to open lightbox
    const firstHangingPhoto = fairyLightsSection.getByRole('button', { name: /View photograph/i }).first();
    await expect(firstHangingPhoto).toBeVisible();
    await firstHangingPhoto.click({ force: true });
    await page.waitForTimeout(400);

    // Verify lightbox dialog is visible
    const lightboxDialog = page.getByRole('dialog', { name: 'Expanded photograph view' });
    await expect(lightboxDialog).toBeVisible();
    await page.screenshot({ path: `docs/screenshots/${prefix}-04-lightbox.png` });

    // Close lightbox
    const closeLightboxBtn = page.getByRole('button', { name: 'Close photo view' });
    await closeLightboxBtn.click({ force: true });
    await page.waitForTimeout(300);

    // 6. Chapter 05 Photobooth Strip
    const photoboothSection = page.locator('#chapter-05');
    await photoboothSection.scrollIntoViewIfNeeded();
    await expect(page.getByText('Our little photobooth')).toBeVisible();
    await expect(page.getByText('Some pictures do not need perfect lighting. Just us.')).toBeVisible();
    await page.screenshot({ path: `docs/screenshots/${prefix}-05-photobooth.png` });

    // 7. Chapter 06 Ordinary Days
    const ordinarySection = page.locator('#chapter-06');
    await ordinarySection.scrollIntoViewIfNeeded();
    await expect(page.getByText('And then there are all the ordinary days')).toBeVisible();
    await page.screenshot({ path: `docs/screenshots/${prefix}-06-ordinary-days.png` });

    // 8. Chapter 07 Interactive Birthday Cake Ritual
    const cakeSection = page.locator('#chapter-07');
    await cakeSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1400); // wait for UNLIT_INTRO -> LIT_READY

    const blowBtn = page.getByRole('button', { name: 'Blow out the candles' });
    await blowBtn.scrollIntoViewIfNeeded();
    await expect(blowBtn).toBeVisible();
    await page.screenshot({ path: `docs/screenshots/${prefix}-07-cake-lit.png` });

    // Click "Blow out the candles"
    await blowBtn.click({ force: true });
    await page.waitForTimeout(3000); // wait through BLOWING -> EXTINGUISHING -> REVEAL -> COMPLETE

    // Verify reveal message
    await expect(page.getByText(/Happy birthday, my love/i)).toBeVisible();
    await page.screenshot({ path: `docs/screenshots/${prefix}-07-cake-extinguished.png` });

    // Continue to letter
    const continueFromCake = cakeSection.getByRole('button', { name: 'Continue' });
    await continueFromCake.scrollIntoViewIfNeeded();
    await continueFromCake.click();
    await page.waitForTimeout(500);

    // 9. Chapter 08 Full Love Letter
    const letterSection = page.locator('#chapter-08');
    await letterSection.scrollIntoViewIfNeeded();
    await page.screenshot({ path: `docs/screenshots/${prefix}-08-letter-envelope-folded.png` });

    // Click folded retro envelope to break seal & unfold letter
    const envelopeBtn = page.getByRole('button', { name: 'Open your birthday love letter' });
    await expect(envelopeBtn).toBeVisible();
    await envelopeBtn.click({ force: true });
    await page.waitForTimeout(900); // wait for 3D flap & parchment unfolding animation

    await expect(page.getByText('My Aanya,')).toBeVisible();
    await expect(page.getByText('I love you. I love having you in my life')).toBeVisible();
    await expect(letterSection.getByText('Anant', { exact: true })).toBeVisible();
    await page.screenshot({ path: `docs/screenshots/${prefix}-08-love-letter.png` });

    // 10. Chapter 09 Magazine Invitation
    const inviteSection = page.locator('#chapter-09');
    await inviteSection.scrollIntoViewIfNeeded();
    await expect(page.getByRole('heading', { name: 'There is one more thing.' })).toBeVisible();
    const openMagBtn = inviteSection.getByRole('button', { name: 'Open your magazine' }).first();
    await expect(openMagBtn).toBeVisible();
    await page.screenshot({ path: `docs/screenshots/${prefix}-09-magazine-invitation.png` });

    // Open the magazine!
    await openMagBtn.click({ force: true });
    await page.waitForTimeout(600);

    // 11. Magazine Reader View
    const magDialog = page.getByRole('dialog', { name: 'Aanya Birthday Luxury Magazine' });
    await expect(magDialog).toBeVisible();
    await expect(magDialog.getByText('Cover', { exact: true }).first()).toBeVisible();
    await page.screenshot({ path: `docs/screenshots/${prefix}-10-magazine-closed-cover.png` });

    // Open Cover
    const tapToOpen = magDialog.getByText('Tap to open');
    await tapToOpen.click({ force: true });
    await page.waitForTimeout(800);

    // Should now be on interior page/spread
    await expect(magDialog.getByText(/Page 2 of 12|Pages 2–3 of 12/).first()).toBeVisible();
    await page.screenshot({ path: `docs/screenshots/${prefix}-11-magazine-opened.png` });

    // Turn Next Page
    const nextBtn = magDialog.getByRole('button', { name: 'Next page' }).first();
    await nextBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: `docs/screenshots/${prefix}-12-magazine-next-page.png` });

    // Open Accessible Text Panel
    const textBtn = magDialog.getByRole('button', { name: 'Read accessible page text' });
    await textBtn.click();
    await page.waitForTimeout(300);
    await expect(page.getByText('Accessible Page Transcript')).toBeVisible();
    await page.screenshot({ path: `docs/screenshots/${prefix}-13-magazine-accessible-text.png` });

    // Close text panel
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    // Close Magazine and verify restoration to story
    const backBtn = magDialog.getByRole('button', { name: 'Back to birthday story' });
    await backBtn.click();
    await page.waitForTimeout(400);

    // Verify magazine is closed
    await expect(magDialog).not.toBeVisible();

    // 12. Chapter 10 Finale
    const finaleSection = page.locator('#chapter-10');
    await finaleSection.scrollIntoViewIfNeeded();
    await expect(page.getByText('Forever cheering for you,')).toBeVisible();
    await page.screenshot({ path: `docs/screenshots/${prefix}-14-finale.png` });
  });
});
