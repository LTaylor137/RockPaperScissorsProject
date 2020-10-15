import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionService } from "../../services/selection.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['../selection/selection.component.css']
})

export class ResultComponent implements OnInit {


  playerwins?: boolean = null;

  constructor(public selectionService: SelectionService) { }

  ngOnInit(): void {

    //player win
    if (this.selectionService.selection == 'rock' && this.selectionService._aiselection == 'scissors') {
      this.playerwins = true;
    }
    if (this.selectionService.selection == 'paper' && this.selectionService._aiselection == 'rock') {
      this.playerwins = true;
    }
    if (this.selectionService.selection == 'scissors' && this.selectionService._aiselection == 'paper') {
      this.playerwins = true;
    }

    //AI win
    if (this.selectionService._aiselection == 'rock' && this.selectionService.selection == 'scissors') {
      this.playerwins = false;
    }
    if (this.selectionService._aiselection == 'paper' && this.selectionService.selection == 'rock') {
      this.playerwins = false;
    }
    if (this.selectionService._aiselection == 'scissors' && this.selectionService.selection == 'paper') {
      this.playerwins = false;
    }

    //DRAW
    if (this.selectionService._aiselection == 'rock' && this.selectionService.selection == 'rock') {
      this.playerwins = null;
    }
    if (this.selectionService._aiselection == 'paper' && this.selectionService.selection == 'paper') {
      this.playerwins = null;
    }
    if (this.selectionService._aiselection == 'scissors' && this.selectionService.selection == 'scissors') {
      this.playerwins = null;
    }

  }

  showhidebutton() {
    if (this.selectionService.showhideoptions == false) {
      console.log("option menu shown");
      this.selectionService.showhideoptions = true;
    } else if (this.selectionService.showhideoptions == true) {
      console.log("option menu hidden");
      this.selectionService.showhideoptions = false;
    }
  }

}

