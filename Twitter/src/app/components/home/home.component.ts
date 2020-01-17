import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private userTokenData:any;
  constructor(private authService :AuthService,private router: Router) {
    if (this.authService.userToken == undefined) {
      this.router.navigateByUrl('login');
    }
    else{
      this.userTokenData = this.authService.decodedUserToken;
      console.log(this.userTokenData);
    }
   }

  ngOnInit() {
  }

}
