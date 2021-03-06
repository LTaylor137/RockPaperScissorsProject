import { Component, OnInit } from '@angular/core';
import { RPSGameService } from "../../services/RPSGame.service";
import { OptionsService } from "../../services/options.service";

@Component({
  selector: 'app-dev-info',
  templateUrl: './dev-info.component.html',
  styleUrls: ['./dev-info.component.css']
})

export class DevInfoComponent implements OnInit {

  constructor(public rpsgameService: RPSGameService, public optionsService: OptionsService) { }

  ngOnInit(): void {
  }

}
