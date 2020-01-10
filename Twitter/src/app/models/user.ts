import { Url } from 'url';
import { Tweet } from './tweet';


export class User {
    userId : number;
    userName : string;
    userSurname : string;
    loginName : string;
    password : string;
    email:string;
    imageUrl: string;
    tweets : Tweet[];
}
