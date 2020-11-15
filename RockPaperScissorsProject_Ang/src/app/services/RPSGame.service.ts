import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PlayRequest, GameResult } from '../models/RoundResult';
import { GameCodeRequest } from '../models/GameCode';

@Injectable({
  providedIn: 'root'
})

export class RPSGameService {

  _currentRound: number | null;
  _maxRounds: number | null;
  _maxRoundsReached: boolean | false;

  _playerselection: string | null;
  _cpuselection: string | null;
  _roundResult: string | null;
  _username: string | null;
  _turnsPlayed: number | null;
  _gameCode: string | null;
  RoundResultList: GameResult[] = [];
  GameResult: string | null;

  constructor(private router: Router, private httpClient: HttpClient) { }

  calculateGameResult() {
    var PWin = 0;
    var CWin = 0;
    this.RoundResultList.forEach(element => {
      if (element.roundResult == "Player Wins") {
        PWin++;
      } else if (element.roundResult == "CPU Wins") {
        CWin++;
      }
    });
    if (PWin > CWin){
      this.GameResult = "Player Wins Game"
    } else if (CWin > PWin){
      this.GameResult = "CPU Wins Game"
    } else {
      this.GameResult = "Draw Game"
    } 
  }

  checkmaxroundsmet() {
    if (this._currentRound == this._maxRounds) {
      this._maxRoundsReached = true;
    } else {
      this._maxRoundsReached = false;
    };
    return this._maxRoundsReached;
  }

  setRounds(maxRounds: 1 | 3 | 5) {
    this._maxRounds = maxRounds;
  }

  createGame() {
    for (let x = 0; x < this.RoundResultList.length; x++) {
      this.RoundResultList.splice(x);
    }
    let request = this.httpClient.get<GameCodeRequest>("http://localhost:5000/Api/GetGameCode",
      // let request = this.httpClient.post<GameResult>("http://Rpsapi-env-1.eba-jc4wmqcm.us-east-1.elasticbeanstalk.com/Result",
      {});
    request.subscribe((response) => {
      this._gameCode = response.gameCode;
      this.router.navigateByUrl('/selection');
    }, error => {
      console.error(error);
      alert("The API has thrown an error while generating the gamecode")
    });
  }

  setSelection(playerSelection: 'rock' | 'paper' | 'scissors') {
    this._playerselection = playerSelection;
  }

  commitSelection() {
    this._turnsPlayed = 1;

    if (this._playerselection == null) {
      alert("You must make a selection");
    } else {

      if (this._username == null) {
        this._username = "No name entered";
      }

      let request = this.httpClient.post<GameResult>("http://localhost:5000/Api/GetResult",
        // let request = this.httpClient.post<GameResult>("http://Rpsapi-env-1.eba-jc4wmqcm.us-east-1.elasticbeanstalk.com/Result",
        {
          PlayerChoice: this._playerselection,
          Username: this._username,
          TurnsPlayed: this._turnsPlayed,
        } as PlayRequest);
      request.subscribe((response) => {
        // this.RoundResultList[this._currentRound] = response; // adds response values to a temporary list in order to get all round results later.
        this.RoundResultList.push(response);
        this._playerselection = response.playerChoice;
        this._cpuselection = response.cpuChoice;
        this._roundResult = response.roundResult;
        this.router.navigateByUrl('/result');
      }, error => {
        console.error(error);
        alert("The API has thrown an error while retrieving round result")
      });
    }
  }
}
