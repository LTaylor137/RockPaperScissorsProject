import { Component, OnInit } from '@angular/core';
import { RPSGameService } from "../../services/RPSGame.service";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})






export class OptionsComponent implements OnInit {

  constructor(public rpsgameService: RPSGameService) { }

  ngOnInit(): void {

//     document.getElementById("UNInput").addEventListener("keyup", function (event) {
//   event.preventDefault();
//   if (event.key || event.keyCode === 13) {
//     document.getElementById("UNSubBut").click();
//   }
// });

  }

  ToggleMenu() {
    this.rpsgameService.ToggleMenu();
  }

  DevInfoButton() {
    this.rpsgameService.showhidedevinfo();
  }

  SubmitUNBtn(_username: string) {
    _username = _username;
    this.rpsgameService.SubmitUsername(_username);
  }

  ResetUsername() {
    this.rpsgameService.UNSubmitted = false;
  }
}
