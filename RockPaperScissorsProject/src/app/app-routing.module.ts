import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectionComponent } from './routes/selection/selection.component';
import { ResultComponent } from './routes/result/result.component';

const routes: Routes = [

  { path: "selection", component: SelectionComponent },
  { path: "result", component: ResultComponent },
  { path: "**", redirectTo: "selection" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
