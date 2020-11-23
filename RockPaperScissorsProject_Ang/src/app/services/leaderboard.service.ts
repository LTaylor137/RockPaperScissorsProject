import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsernameRequest, LeaderboardResponse } from "../models/Leaderboard";

@Injectable({
  providedIn: 'root'
})

export class LeaderboardService {

  LeaderboardItem: LeaderboardResponse[] = [];
  public loading: boolean = false;
  public loaded: boolean = false;

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void { }

  Leaderboard() {
    let request = this.httpClient.get<LeaderboardResponse[]>("http://localhost:5000/Api/GetLeaderboard");
    // let request = this.httpClient.post<GameResult>("http://Rpsapi-env-1.eba-jc4wmqcm.us-east-1.elasticbeanstalk.com/Leaderboard",
    this.loading = true;
    this.loaded = false;
    request.subscribe((response) => {
      this.LeaderboardItem = response;
      this.loading = false;
      this.loaded = true;
      this.router.navigateByUrl('/leaderboard');
    }
    );
  }

}
