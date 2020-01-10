import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TweetDetailComponent } from './components/tweet-detail/tweet-detail.component';


const routes: Routes = [
{path :'login',component:LoginComponent},
{path:'',redirectTo:'login',pathMatch:'full'},
{path:'tweet/detail/:tweetId',component:TweetDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
