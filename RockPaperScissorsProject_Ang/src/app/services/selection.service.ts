import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PlayRequest, GameResult } from '../models/Submit';

@Injectable({
  providedIn: 'root'
})

export class SelectionService {

  _playerselection: string | null;
  _aiselection: string | null;
  _result: string | null;

  showHideDevInfo: boolean = false;

  get selection() {
    return this._playerselection;
  }

  constructor(private router: Router, private httpClient: HttpClient) {
  }

  setSelection(playerchoice: 'rock' | 'paper' | 'scissors') {
    this._playerselection = playerchoice;
  }

  commitSelection() {
    let request = this.httpClient.post<GameResult>("http://localhost:5000/Result",
    {
      PlayerChoice: this._playerselection,
    });
    request.subscribe((response) => {
      this._playerselection = response.playerChoice;
      this._aiselection = response.cpuChoice;
      this._result = response.result;
      this.router.navigateByUrl('/result');
    }
    );


    // showhidedevinfo() {
    //   if (this.selectionService.showHideDevInfo == false) {
    //     console.log("option menu shown");
    //     this.selectionService.showHideDevInfo = true;
    //   } else if (this.selectionService.showHideDevInfo == true) {
    //     console.log("option menu hidden");
    //     this.selectionService.showHideDevInfo = false;
    //   }
    // }

  }
}
