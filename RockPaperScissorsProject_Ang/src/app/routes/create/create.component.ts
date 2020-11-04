import { Component, OnInit } from '@angular/core';
import { RPSGameService } from "../../services/RPSGame.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['../RouteStyles.css']
})
export class CreateComponent implements OnInit {

  constructor(public rpsgameService: RPSGameService) { }

  ngOnInit(): void {
  }


  roundSelection(roundSelected: '1' | '3' | '5') {
    this.rpsgameService.setRounds(roundSelected);
  }

  createGame() {
    this.rpsgameService.createGame();
  }





}


