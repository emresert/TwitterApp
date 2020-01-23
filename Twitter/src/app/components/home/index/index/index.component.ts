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

  constructor(private tweetService: TweetService) { }

  ngOnInit() {
    this.getTweets();
  }
  getTweets() {
    this.tweetService.getTweets().subscribe(data => {
      
      this.userTweetInfo = data;
      console.log("*/*/*/");
      console.log(this.userTweetInfo);

    })
  }

  addTweet(form: NgForm) {
    this.tweetService.addTweet(this.tweetForAddDto).subscribe(savedTweet => {
      this.tweets.push(savedTweet);
      alertify.success('Tweet eklendi.');
      console.log("-*-*-");
      console.log(this.tweets)
    })
  }
}
