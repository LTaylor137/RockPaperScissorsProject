import { Component, OnInit } from '@angular/core';
import { SelectionService } from "../../services/selection.service";
import { style } from '@angular/animations';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})

export class SelectionComponent implements OnInit {

  constructor(public selectionService: SelectionService) { }

  ngOnInit(): void {
  }

  playerSelection(playerchoice: 'rock' | 'paper' | 'scissors') {
    this.selectionService.setSelection(playerchoice);

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
    this.selectionService.commitSelection();
  }

  showhidedevinfo() {
    if (this.selectionService.showHideDevInfo == false) {
      console.log("option menu shown");
      this.selectionService.showHideDevInfo = true;
    } else if (this.selectionService.showHideDevInfo == true) {
      console.log("option menu hidden");
      this.selectionService.showHideDevInfo = false;
    }
  }




}
