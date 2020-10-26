import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectionComponent } from './routes/selection/selection.component';
import { ResultComponent } from './routes/result/result.component';
import { HttpClientModule} from '@angular/common/http';
import { DevInfoComponent } from './components/dev-info/dev-info.component';
import { OptionsComponent } from './components/options/options.component';
import { LeaderboardComponent } from './routes/leaderboard/leaderboard.component';

// HttpClientModule has to be imported here in order 
// for the app to be able to pass info to a remote client

@NgModule({
  declarations: [
    AppComponent,
    SelectionComponent,
    ResultComponent,
    DevInfoComponent,
    OptionsComponent,
    LeaderboardComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
