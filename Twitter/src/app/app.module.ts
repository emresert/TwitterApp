import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { TweetDetailComponent } from './components/tweet-detail/tweet-detail.component';


@NgModule({
  declarations: [
    AppComponent,
   LoginComponent,
   TweetComponent,
   TweetDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
