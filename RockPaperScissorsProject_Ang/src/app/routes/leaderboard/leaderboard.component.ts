import { Component, OnInit } from '@angular/core';
import { RPSGameService } from "../../services/RPSGame.service";
import { LeaderboardService } from "../../services/leaderboard.service";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['../RouteStyles.css']
})
export class LeaderboardComponent implements OnInit {

  constructor(public leaderboardService : LeaderboardService) { }

  ngOnInit(): void {
  }

}
