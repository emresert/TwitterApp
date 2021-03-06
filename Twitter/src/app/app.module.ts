import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';


import { HomeComponent } from './components/home/home.component';
import { IndexComponent } from './components/home/index/index/index.component';
import {MatMenuModule} from '@angular/material/menu';



@NgModule({
  declarations: [
   AppComponent,
   LoginComponent,HomeComponent,IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,MatInputModule,
    HttpClientModule,FormsModule,MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
