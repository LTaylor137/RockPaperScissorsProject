import { Component, OnInit } from '@angular/core';
import { RPSGameService } from "../../services/RPSGame.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['../RouteStyles.css']
})

export class ResultComponent implements OnInit {

  constructor(public rpsgameService: RPSGameService) { }

  ngOnInit(): void {
}

SeeLeaderboard() {
  this.rpsgameService.Leaderboard();
}

}
