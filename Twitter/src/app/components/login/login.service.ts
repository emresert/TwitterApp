import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse , HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Observable, throwError } from 'rxjs';
import {tap,catchError} from 'rxjs/operators';
@Injectable() 

export class LoginService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer example',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*'
    }),
    withCredentials: false
  };


constructor(private http: HttpClient) { }
private apiUrl = "https://localhost:44365/api/user/";

getUser(userName:string): Observable<User> {
  return this.http.get<User>(this.apiUrl+ userName,this.httpOptions).pipe(
    tap(data=>console.log(JSON.stringify(data))),
    catchError(this.handleError)
  );
}

handleError(err:HttpErrorResponse) {
  let errorMessages = '';
  
  if (err.error instanceof ErrorEvent) {
    errorMessages = "bir hata oluştu. " + err.error.message; 
  }
  else{
    errorMessages ="sistemsel bir hata oluştu";
  }
  return throwError(errorMessages); 
}

}
