import { Component, OnInit } from '@angular/core';
import { RPSGameService } from "../../services/RPSGame.service";
import { LeaderboardService } from "../../services/leaderboard.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['../RouteStyles.css']
})

export class ResultComponent implements OnInit {

  constructor(public rpsgameService: RPSGameService, public leaderboardService: LeaderboardService) { }

  ngOnInit(): void {
    this.rpsgameService.checkmaxroundsmet();
    this.rpsgameService.calculateGameResult();
  }


}
