import { User } from './user';

export class Tweet {
    tweetId : number;
    tweetContent : string;
    tweetDate : Date;
    userIdFk  : User;
}
