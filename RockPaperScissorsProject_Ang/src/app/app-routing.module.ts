import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectionComponent } from './routes/selection/selection.component';
import { ResultComponent } from './routes/result/result.component';
import { LeaderboardComponent } from './routes/leaderboard/leaderboard.component';
import { CreateComponent } from './routes/create/create.component';

const routes: Routes = [

  { path: "create", component: CreateComponent },
  { path: "selection", component: SelectionComponent },
  { path: "result", component: ResultComponent },
  { path: "leaderboard", component: LeaderboardComponent }, 
  { path: "**", redirectTo: "selection" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
