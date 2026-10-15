import { audioService } from '../services/audioService';

export class MagazineAudio {
  public static playCoverOpen() {
    audioService.playEnvelopeOpen();
  }

  public static playPageTurn() {
    audioService.playPageTurn();
  }

  public static playPageSettle() {
    audioService.playPageSettle();
  }

  public static playCoverClose() {
    audioService.playEnvelopeOpen();
  }
}
