import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    // Tarayıcıya Login route gririlirse Login Componenti çağır
    {path :'login',component:LoginComponent},
    {path :'home',component:HomeComponent}, 
   //Tarayıcıya hiçbirşey yazılmamışsa Login'e yönlendir
    {path:'',redirectTo:'login',pathMatch:'full'}, 
   //Tarayıcıya belirtilenlerin dışında değer gelirse login'e yönlendir
    {path:'**',redirectTo:'login',pathMatch:'full'} ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
