import { Component, OnInit } from '@angular/core';
import { RPSGameService } from "../../services/RPSGame.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['../RouteStyles.css']
})
export class CreateComponent implements OnInit {

  constructor(public rpsgameService: RPSGameService) { }

  ngOnInit(): void {
    this.rpsgameService._gameCode = "";
    this.rpsgameService._currentRound = 0;
    this.rpsgameService._maxRounds = 1;
    this.rpsgameService._maxRoundsReached = false;
    // this.rpsgameService.RoundResultList.clear; 
  }


  roundSelection(maxRounds: 1 | 3 | 5) {
    this.rpsgameService.setRounds(maxRounds);

    //the below highlights the selected option==========================
    document.getElementById("1").classList.remove('boxselected');
    document.getElementById("3").classList.remove('boxselected');
    document.getElementById("5").classList.remove('boxselected');
    if (maxRounds === 1) {
      document.getElementById("1").classList.add('boxselected');
    }
    if (maxRounds === 3) {
      document.getElementById("3").classList.add('boxselected');
    }
    if (maxRounds === 5) {
      document.getElementById("5").classList.add('boxselected');
    }
    //==================================================================

  }

  createGame() {
    this.rpsgameService.createGame();
  }





}


