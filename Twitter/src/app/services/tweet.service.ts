import { Injectable } from '@angular/core';
import { TweetForAddDto } from '../dto/tweetForAddDto'; 
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Tweet } from '../models/tweet';
import { AuthService } from './auth.service';
import { UserTweetInfoDto } from '../dto/userTweetInfoDto';
declare let alertify: any;

@Injectable()
export class TweetService {
  apiUrl = "https://localhost:44365/api/Tweets/"

 
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*'
    }),
    withCredential: false
  };

  tweet: TweetForAddDto = new TweetForAddDto();
  tweets:  Tweet[];

  userTweetInfo : UserTweetInfoDto []= [];


  constructor(private http: HttpClient, private auth: AuthService) {
  }

 getTweets(): Observable<UserTweetInfoDto[]>{
   return this.http.get<UserTweetInfoDto[]>(this.apiUrl,this.httpOptions);
 }


  addTweet(tweetForSend: TweetForAddDto): Observable<Tweet> {
    this.tweet.tweetContent = tweetForSend.tweetContent;
    this.tweet.userIdFk = +this.auth.getCurrentUserId();
    return this.http.post<Tweet>(this.apiUrl + 'add', this.tweet, this.httpOptions).pipe(
      tap(data => console.log('Eklenen Tweet' + JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  handleError(err: HttpErrorResponse) {
    let errorMessages = '';
    if (err.error instanceof ErrorEvent) {
      alertify.error('bir hata oluştu.')
    }
    else {
      alertify.error('sistemsel bir hata oluştu')
      errorMessages = "sistemsel bir hata oluştu";
    }
    return throwError(errorMessages);
  }

}

