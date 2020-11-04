import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PlayRequest, GameResult } from '../models/RoundResult';
import { UsernameRequest, LeaderboardResponse } from "../models/Leaderboard";

@Injectable({
  providedIn: 'root'
})

export class RPSGameService {

  _roundselection: string | null;

  _playerselection: string | null;
  _cpuselection: string | null;
  _result: string | null;
  _username: string | null;
  _turnsPlayed: number | null;

  LeaderboardItem: LeaderboardResponse[] = [];

  ShowMenu: boolean = false;
  showHideDevInfo: boolean = false;
  UNSubmitted: boolean = false;

  constructor(private router: Router, private httpClient: HttpClient) {
  }

  //set rounds / create game
  setRounds(roundSelected: '1' | '3' | '5') {
    this._roundselection = roundSelected;
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

  Leaderboard() {
    //use this when running API on local machine.
    let request = this.httpClient.get<LeaderboardResponse[]>("http://localhost:5000/Api/Result/GetLeaderboard",
      //use this when running API on elastic beanstalk servers.
      // let request = this.httpClient.post<GameResult>("http://Rpsapi-env-1.eba-jc4wmqcm.us-east-1.elasticbeanstalk.com/Leaderboard",
      {});
    request.subscribe((response) => {
      this.LeaderboardItem = response;
      this.router.navigateByUrl('/leaderboard');
    }
    );
  }

  ToggleMenu() {
    if (this.ShowMenu === true) {
      this.ShowMenu = false;
    } else if (this.ShowMenu === false) {
      this.ShowMenu = true;
    }
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

  SubmitUsername(_username: string) {
    if (_username === "") {
      alert("Username cannot be blank");
    } else {
      this._username = _username;
      this.UNSubmitted = true;
    }
  }



}
