import { Component, OnInit } from '@angular/core';
import { RPSGameService } from "../../services/RPSGame.service";
import { LeaderboardService } from "../../services/leaderboard.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['result.css']
})

export class ResultComponent implements OnInit {

  constructor(public rpsgameService: RPSGameService, public leaderboardService: LeaderboardService) { }

  ngOnInit(): void {
    this.rpsgameService.checkMaxRoundsMet();
    this.rpsgameService.calculateGameResult();
  }


}
