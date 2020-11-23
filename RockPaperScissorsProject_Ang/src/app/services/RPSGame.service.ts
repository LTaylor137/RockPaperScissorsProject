import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PlayRequest, RoundResult } from '../models/RoundResult';
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
  _roundResultList: RoundResult[] = [];
  _gameResult: string | null;
  _dateTime: string | null;

  constructor(private router: Router, private httpClient: HttpClient) { }

  calculateGameResult() {
    var PWin = 0;
    var CWin = 0;
    this._roundResultList.forEach(element => {
      if (element.roundResult == "Player Wins") {
        PWin++;
      } else if (element.roundResult == "CPU Wins") {
        CWin++;
      }
    });
    if (PWin > CWin) {
      this._gameResult = "Player Wins Game"
    } else if (CWin > PWin) {
      this._gameResult = "CPU Wins Game"
    } else {
      this._gameResult = "It's a Draw"
    }
    //send _gameResult to DataBase
    let request = this.httpClient.post<PlayRequest>("http://localhost:5000/Api/SendGameResult",
      // let request = this.httpClient.post<_gameResult>("http://Rpsapi-env-1.eba-jc4wmqcm.us-east-1.elasticbeanstalk.com/Result",
      {
        GameCode: this._gameCode,
        GameResult: this._gameResult,
        DateTime: this._dateTime
      } as PlayRequest);
    request.subscribe((response) => {
    },
      error => {
        console.error(error);
        alert("The API has thrown an error while generating Game Results " + error)
      }
    );
  }

  createDateTimeString() {
    let GetDate = new Date().toISOString().replace(/[^0-9]/g, '');
    return GetDate;
  }

  checkMaxRoundsMet() {
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
    if (this._username == null) {
      alert("You must enter a username before you can create a game")
    } else {
      for (let x = 0; x < this._roundResultList.length; x++) {
        this._roundResultList.splice(x);
      }

      this._dateTime = this.createDateTimeString();

      let request = this.httpClient.post<GameCodeRequest>("http://localhost:5000/Api/CreateGame",
        // let request = this.httpClient.post<_gameResult>("http://Rpsapi-env-1.eba-jc4wmqcm.us-east-1.elasticbeanstalk.com/Result",
        {
          Username: this._username,
          DateTime: this._dateTime
        } as PlayRequest);
      request.subscribe((response) => {
        this._username = response.username;
        this._gameCode = response.gameCode;
        this.router.navigateByUrl('/selection');
      },
        error => {
          console.error(error);
          alert("The API has thrown an error while generating the gamecode \n"
            + "Likely a DateTime generation error, please try again.")
        }
      );
    }
  }

  setSelection(playerSelection: 'rock' | 'paper' | 'scissors') {
    this._playerselection = playerSelection;
  }

  commitSelection() {
    this._turnsPlayed = 1;

    if (this._playerselection == null) {
      alert("You must make a selection");
    } else {

      this._dateTime = this.createDateTimeString();

      if (this._username == null) {
        this._username = "No name entered";
      }

      if (this._gameResult == null) {
        this._gameResult = "NoGameResult"
      }

      let request = this.httpClient.post<RoundResult>("http://localhost:5000/Api/GetRoundResult",
        // let request = this.httpClient.post<_gameResult>("http://Rpsapi-env-1.eba-jc4wmqcm.us-east-1.elasticbeanstalk.com/Result",
        {
          GameCode: this._gameCode,
          TurnNumber: this._currentRound,
          PlayerChoice: this._playerselection,
          Username: this._username,
          TurnsPlayed: this._turnsPlayed,
          DateTime: this._dateTime
        } as PlayRequest);
      request.subscribe((response) => {
        this._roundResultList.push(response);
        this._playerselection = response.playerChoice;
        this._cpuselection = response.cpuChoice;
        this._roundResult = response.roundResult;
        this.router.navigateByUrl('/result');
      },
        error => {
          console.error(error);
          alert("The API has thrown an error while retrieving round result")
        }
      );
    }
  }
}
