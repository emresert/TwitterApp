import { Component, OnInit } from '@angular/core';
import { TweetService } from 'src/app/services/tweet.service';
import { NgForm } from '@angular/forms';
import { TweetForAddDto } from 'src/app/dto/tweetForAddDto';
import { Tweet } from 'src/app/models/tweet';
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

  constructor(private tweetService: TweetService) { }

  ngOnInit() {
    this.getTweets();
  }

  getTweets() {
    this.tweetService.getTweets().subscribe(data => {
      this.tweets = data;
      console.log(this.tweets);
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
