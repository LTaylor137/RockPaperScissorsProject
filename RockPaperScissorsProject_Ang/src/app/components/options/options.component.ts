import { Component, OnInit } from '@angular/core';
import { SelectionService } from "../../services/selection.service";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  constructor(public selectionService: SelectionService) { }

  ngOnInit(): void {
  }

  DevInfoButton(){
    this.selectionService.showhidedevinfo();
  }

}
