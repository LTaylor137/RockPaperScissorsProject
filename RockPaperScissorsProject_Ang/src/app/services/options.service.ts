import { Injectable } from '@angular/core';
import { RPSGameService } from "../services/RPSGame.service";

@Injectable({
  providedIn: 'root'
})

export class OptionsService {

  ShowMenu: boolean = false;
  showHideDevInfo: boolean = false;
  UNSubmitted: boolean = false;

  constructor(public rpsgameService: RPSGameService) { }

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
      this.rpsgameService._username = _username;
      this.UNSubmitted = true;
    }
  }


}