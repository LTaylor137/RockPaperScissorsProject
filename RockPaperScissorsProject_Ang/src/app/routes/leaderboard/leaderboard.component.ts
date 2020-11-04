import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from "../../services/leaderboard.service";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['../RouteStyles.css']
})
export class LeaderboardComponent implements OnInit {

  constructor(public leaderboardService : LeaderboardService) { }

//leaderboard list get request is sent on page load.
  ngOnInit(): void {
  this.leaderboardService.Leaderboard();
  }

}
