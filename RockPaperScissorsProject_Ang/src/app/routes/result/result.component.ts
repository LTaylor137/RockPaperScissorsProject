import { Component, OnInit } from '@angular/core';
import { SelectionService } from "../../services/selection.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['../selection/selection.component.css']
})

export class ResultComponent implements OnInit {

  constructor(public selectionService: SelectionService) { }

  ngOnInit(): void {
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
