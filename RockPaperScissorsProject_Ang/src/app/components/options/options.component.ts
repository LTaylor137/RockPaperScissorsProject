import { Component, OnInit } from '@angular/core';
import { RPSGameService } from "../../services/RPSGame.service";
import { OptionsService } from "../../services/options.service";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})

export class OptionsComponent implements OnInit {

  constructor(public rpsgameService: RPSGameService, public optionsService: OptionsService) { }

  ngOnInit(): void {

  }

  ToggleMenu() {
    this.optionsService.ToggleMenu();
  }

  DevInfoButton() {
    this.optionsService.showhidedevinfo();
  }

  SubmitUNBtn(_username: string) {
    _username = _username;
    this.optionsService.SubmitUsername(_username);
  }

  ResetUsername() {
    this.optionsService.UNSubmitted = false;
  }
}
