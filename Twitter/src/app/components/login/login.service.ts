import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { UserLoginDto } from 'src/app/dto/userLoginDto';
@Injectable()

export class LoginService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;',
      'Authorization': 'bearer example',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*'
    }),
    withCredentials: false
  };


constructor(private http: HttpClient) { }
private apiRegisterUrl = "https://localhost:44365/api/Auth/register";
private apiLoginUrl = "https://localhost:44365/api/Auth/login";
private userToken;
  

  LoginUser(userToSend:UserLoginDto):Observable<User>{
  
    return this.http.post<User>(this.apiLoginUrl,userToSend,this.httpOptions).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  
  saveToken(token){
    localStorage.setItem('token',token);
    this.userToken = token;
  }
    
  handleError(err: HttpErrorResponse) {
    let errorMessages = '';

    if (err.error instanceof ErrorEvent) {
      errorMessages = "bir hata oluştu. " + err.error.message;
    }
    else {
      errorMessages = "sistemsel bir hata oluştu";
    }
    return throwError(errorMessages);
  }

}
