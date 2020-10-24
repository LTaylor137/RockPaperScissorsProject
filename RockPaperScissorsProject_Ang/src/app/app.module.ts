import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectionComponent } from './routes/selection/selection.component';
import { ResultComponent } from './routes/result/result.component';
import { HttpClientModule} from '@angular/common/http';

// HttpClientModule has to be imported here in order 
// for the app to be able to pass info to a remote client

@NgModule({
  declarations: [
    AppComponent,
    SelectionComponent,
    ResultComponent
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
