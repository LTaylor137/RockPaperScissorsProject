import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PlayRequest, GameResult } from '../models/RoundResult';

@Injectable({
  providedIn: 'root'
})

export class RPSGameService {

  _currentRound: number | null;
  _maxRounds: number | null;
  _playerselection: string | null;
  _cpuselection: string | null;
  _result: string | null;
  _username: string | null;
  _turnsPlayed: number | null;
  
  constructor(private router: Router, private httpClient: HttpClient) { }

  //set rounds / create game
  setRounds(maxRounds: 1 | 3 | 5) {
    this._maxRounds = maxRounds;
  }

  createGame() {
    this.router.navigateByUrl('/selection');
  }

  //set selection, send selection
  setSelection(playerSelection: 'rock' | 'paper' | 'scissors') {
    this._playerselection = playerSelection;
  }

  commitSelection() {
    this._turnsPlayed = 1;

    if (this._username == null) {
      this._username = "No name entered";
    }
    //use this when running API on local machine.
    let request = this.httpClient.post<GameResult>("http://localhost:5000/Api/Result",
      //use this when running API on elastic beanstalk servers.
      // let request = this.httpClient.post<GameResult>("http://Rpsapi-env-1.eba-jc4wmqcm.us-east-1.elasticbeanstalk.com/Result",
      {
        PlayerChoice: this._playerselection,
        Username: this._username,
        TurnsPlayed: this._turnsPlayed,
      } as PlayRequest);
    request.subscribe((response) => {
      this._playerselection = response.playerChoice;
      this._cpuselection = response.cpuChoice;
      this._result = response.result;
      this.router.navigateByUrl('/result');
    }, error => {
      console.error(error);
      alert("The API has thrown an error")
    });
  }




}
