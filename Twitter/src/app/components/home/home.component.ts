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
  
   }

  ngOnInit() {
    // Token varsa true döndürür ve home yüklenmeye devam eder yoksa 
    // false döndürür ve login sayfasını yükler
    if (this.isAuthenticated == false) {
      this.router.navigateByUrl('login');
    }
  }

  // get parametresi ile 
  // Fonksiyondan dönen değeri property olarak almak.
  // Login olma durumuna göre True/False döner
  get isAuthenticated(){
    return this.authService.loggedIn();
   }
}
