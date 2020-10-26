import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PlayRequest, GameResult } from '../models/Submit';
import { ResultComponent } from '../routes/result/result.component';

@Injectable({
  providedIn: 'root'
})

export class RPSGameService {

  _playerselection: string | null;
  _cpuselection: string | null;
  _result: string | null;

  showHideDevInfo: boolean = false;

  constructor(private router: Router, private httpClient: HttpClient) {
  }

  setSelection(playerchoice: 'rock' | 'paper' | 'scissors') {
    this._playerselection = playerchoice;
  }

  commitSelection() {

    //use this when running API on local machine.
    // let request = this.httpClient.post<GameResult>("http://localhost:5000/Result",

    //use this when running API on elastic beanstalk servers.
    let request = this.httpClient.post<GameResult>("http://Rpsapi-env-1.eba-jc4wmqcm.us-east-1.elasticbeanstalk.com/Result",

      {
        PlayerChoice: this._playerselection,
      });
    request.subscribe((response) => {
      this._playerselection = response.playerChoice;
      this._cpuselection = response.cpuChoice;
      this._result = response.result;
      this.router.navigateByUrl('/result');
    }
    );
  }

  showhidedevinfo() {
    if (this.showHideDevInfo == false) {
      console.log("option menu shown");
      this.showHideDevInfo = true;
    } else if (this.showHideDevInfo == true) {
      console.log("option menu hidden");
      this.showHideDevInfo = false;
    }
  }



}
