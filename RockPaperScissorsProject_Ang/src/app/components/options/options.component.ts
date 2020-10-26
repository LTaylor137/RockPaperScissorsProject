import { Component, OnInit } from '@angular/core';
import { RPSGameService } from "../../services/RPSGame.service";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  constructor(public rpsgameService: RPSGameService) { }

  ngOnInit(): void {
  }

  ToggleMenu(){
    this.rpsgameService.ToggleMenu();
  }

  DevInfoButton(){
    this.rpsgameService.showhidedevinfo();
  }




}
