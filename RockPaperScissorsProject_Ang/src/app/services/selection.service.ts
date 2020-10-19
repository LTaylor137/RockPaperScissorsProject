import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { randomBytes } from 'crypto';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class SelectionService {

  private _selection?: 'rock' | 'paper' | 'scissors';
  _aioptions = ["rock", "paper", "scissors"];
  _aiselection?= null;

  showhideoptions: boolean = false;

  get selection() {
    return this._selection;
  }

  constructor(private router: Router) { }

  commitSelection(option: 'rock' | 'paper' | 'scissors') {

    this._aiselection = Math.floor(Math.random() * this._aioptions.length);
    if (this._aiselection === 0) {
      this._aiselection = "rock";
    } else if (this._aiselection === 1) {
      this._aiselection = "paper";
    } else if (this._aiselection === 2) {
      this._aiselection = "scissors";
    }

    of(null).pipe(delay(100)).subscribe(() => {
      this._selection = option;
      this.router.navigateByUrl("/result");
    });
  }


}
