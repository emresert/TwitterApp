import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  private styleOfOpenMenu: any;

  constructor(private authService: AuthService, private router: Router) {
    this.styleOfOpenMenu ={
      'display':'none'
    }
  }

  ngOnInit() {
    if (this.isAuthenticated == false) {
      this.router.navigateByUrl('login');
    }
  }

  openMoreMenu(value: boolean) {
    if (value) {
      this.styleOfOpenMenu =
      {
        'position': 'absolute',
        'background-color': 'white',
        'border': '1px solid rgb(226,330,232)',
        'height': '85%',
        'font- size': '14px',
        'border-top-right-radius': '5px',
        'border-top-left-radius': '5px',
        'border-bottom-right-radius': '5px',
        'border-bottom-left-radius': '5px'
      }
    }
      else{
        this.styleOfOpenMenu ={
          'display':'none'
        }
      }
     
    }
  


  get isAuthenticated() {
    return this.authService.loggedIn();
  }
}
