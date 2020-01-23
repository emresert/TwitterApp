import { Component, OnInit } from '@angular/core';
import { TweetService } from 'src/app/services/tweet.service';
import { NgForm } from '@angular/forms';
import { TweetForAddDto } from 'src/app/dto/tweetForAddDto';
import { Tweet } from 'src/app/models/tweet';
import { UserTweetInfoDto } from 'src/app/dto/userTweetInfoDto';
declare let alertify: any;


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [TweetService]
})
export class IndexComponent implements OnInit {

  tweetForAddDto: TweetForAddDto = new TweetForAddDto();
  tweets: Tweet[] = [];
  tweet : Tweet;


  userTweetInfo : UserTweetInfoDto[]= [];
 // userTweetInfo Dizisi get metodu ile çağırıldığında boş ise true değeri döndürür.
  tweetArrayIsEmpty : boolean;
  constructor(private tweetService: TweetService) { }

  ngOnInit() {
     this.getTweets();
  }
  getTweets() {
    this.tweetService.getTweets().subscribe(data => {
      if(data.length > 0){
        this.tweetArrayIsEmpty = false;
        this.userTweetInfo = data;
      }
      else{
        this.tweetArrayIsEmpty = true;
      }
    })
  }

  addTweet(form: NgForm) {
    this.tweetService.addTweet(this.tweetForAddDto).subscribe(savedTweet => {
      this.getTweets();
      alertify.success('Tweet eklendi.');
      this.tweetArrayIsEmpty = false;
    })
  }
}
