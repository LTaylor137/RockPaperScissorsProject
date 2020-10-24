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

