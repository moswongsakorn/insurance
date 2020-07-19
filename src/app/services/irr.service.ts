import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IrrService {

  constructor() { }
  public cf: any
  public LOW_RATE = -0.2
  public HIGH_RATE = 1

  public irr(cf: number[]) {
    let m = 0.0
    let old = 0
    let new_ = 0
    let oldguessRate = this.LOW_RATE
    let newguessRate = this.LOW_RATE
    let guessRate = this.LOW_RATE
    let lowGuessRate = this.LOW_RATE
    let highGuessRate = this.HIGH_RATE;
    let npv = 0.0;
    let denom = 0.0;
    let i: any
    let j: any
    for (i = 0; i < 100000; i++) {
      npv = 0.00;
      for (j = 0; j < cf.length; j++) {
        denom = (1 + guessRate) ** j;
        npv = npv + (cf[j] / denom);
      }
      /* Stop checking once the required precision is achieved */
      if ((npv > 0) && (npv < 0.00000001))
        break;
      if (old == 0)
        old = npv;
      else
        old = new_;
      new_ = npv;
      if (i > 0) {
        if (old < new_) {
          if (old < 0 && new_ < 0)
            highGuessRate = newguessRate;
          else
            lowGuessRate = newguessRate;
        }
        else {
          if (old > 0 && new_ > 0)
            lowGuessRate = newguessRate;
          else
            highGuessRate = newguessRate;
        }
      }
      oldguessRate = guessRate;
      guessRate = (lowGuessRate + highGuessRate) / 2;
      newguessRate = guessRate;
    }
    guessRate = guessRate * 100;
    guessRate = Math.round(guessRate * 100) / 100;
    return guessRate;
  }

}
