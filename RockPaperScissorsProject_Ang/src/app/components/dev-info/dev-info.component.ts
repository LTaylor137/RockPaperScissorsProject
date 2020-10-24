import { Component, OnInit } from '@angular/core';
import { SelectionService } from "../../services/selection.service";

@Component({
  selector: 'app-dev-info',
  templateUrl: './dev-info.component.html',
  styleUrls: ['./dev-info.component.css']
})
export class DevInfoComponent implements OnInit {

  constructor(public selectionService: SelectionService) { }

  ngOnInit(): void {
  }

}
