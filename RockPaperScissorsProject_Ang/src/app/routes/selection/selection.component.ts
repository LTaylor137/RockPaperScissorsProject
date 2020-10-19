import { Component, OnInit } from '@angular/core';
import { SelectionService } from "../../services/selection.service";

@Component({
  selector: 'app-colour-picker',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})

export class SelectionComponent implements OnInit {

  constructor(public selectionService: SelectionService) { }

  ngOnInit(): void {
  }

  selectOption(option: 'rock' | 'paper' | 'scissors'){
    this.selectionService.commitSelection(option);
  }

  showhidebutton(){
      if (this.selectionService.showhideoptions == false){
        console.log("option menu shown");
        this.selectionService.showhideoptions = true;
      } else if (this.selectionService.showhideoptions == true){
        console.log("option menu hidden");
        this.selectionService.showhideoptions = false;
      } 
  }



}
