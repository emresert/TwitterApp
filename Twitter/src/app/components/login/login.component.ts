import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; // Form datalarını göndermek için import edilmeli
import { UserLoginDto } from 'src/app/dto/userLoginDto'; //Login dto import edildi
import { AuthService } from 'src/app/services/auth.service'; // Asıl methodlarımızın yer aldığı servis 
import { Router } from '@angular/router'; // Login ekranında route işlemleri yapmak için tanımlandı


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // html formdan gelen kullanıcı inputlarını bind ediceğimiz modeli tanımladık
  // Bu model controllerdaki post işlemine gönderilecek bir dto objesi.
  userLoginDtoModel: UserLoginDto = new UserLoginDto();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // Token varsa true döndürür ve home yönlendirir yoksa 
    // false döndürür ve login sayfasını yüklemeye devam eder.
    if (this.isAuthenticated != false) {
      this.router.navigateByUrl('home');
    }
    console.log(this.isAuthenticated)
  }

  // Form bilgilerini ve modeli post işlemi için servisdeki login metoduna gönder.
  LoginUser(form: NgForm) {
    this.authService.login(this.userLoginDtoModel);
  }

  LogOutUser() {
    this.authService.logOut()
  }

  // get parametresi ile 
  // Fonksiyondan dönen değeri property olarak almak.
  // Login olma durumuna göre True/False döner
  get isAuthenticated() {
    return this.authService.loggedIn();
  }
}  
