import { Component, OnInit } from '@angular/core';
import { RPSGameService } from "../../services/RPSGame.service";

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['../RouteStyles.css']
})

export class SelectionComponent implements OnInit {

  constructor(public rpsgameService: RPSGameService) { }

  ngOnInit(): void {
  }

  playerSelection(playerchoice: 'rock' | 'paper' | 'scissors') {
    this.rpsgameService.setSelection(playerchoice);

    //the below highlights the selected option==========================
    document.getElementById("rock").classList.remove('boxselected');
    document.getElementById("paper").classList.remove('boxselected');
    document.getElementById("scissors").classList.remove('boxselected');
    if (playerchoice === 'rock') {
      document.getElementById("rock").classList.add('boxselected');
    } 
    if (playerchoice === 'paper') {
      document.getElementById("paper").classList.add('boxselected');
    } 
    if (playerchoice === 'scissors') {
      document.getElementById("scissors").classList.add('boxselected');
    }
    //==================================================================
  }

  shoot() {
    this.rpsgameService.commitSelection();
  }

}
