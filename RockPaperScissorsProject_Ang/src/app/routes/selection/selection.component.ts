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

  playerSelection(playerselection: 'rock' | 'paper' | 'scissors') {
    this.rpsgameService.setSelection(playerselection);

    //the below highlights the selected option==========================
    document.getElementById("rock").classList.remove('boxselected');
    document.getElementById("paper").classList.remove('boxselected');
    document.getElementById("scissors").classList.remove('boxselected');
    if (playerselection === 'rock') {
      document.getElementById("rock").classList.add('boxselected');
    } 
    if (playerselection === 'paper') {
      document.getElementById("paper").classList.add('boxselected');
    } 
    if (playerselection === 'scissors') {
      document.getElementById("scissors").classList.add('boxselected');
    }
    //==================================================================
  }

  shoot() {
    this.rpsgameService.commitSelection();
  }

}
