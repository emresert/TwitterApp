import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { IndexComponent } from './components/home/index/index/index.component';


const routes: Routes = [
 
    {path :'login',component:LoginComponent},
    {path:'',redirectTo:'login',pathMatch:'full'}, 
    

   
    {
       // home / ... gibi home'dan sonra gelen linkler içib children url tanımlamaları yapılır.
      path: 'home', component:HomeComponent, children: [
        //  home/ 'dan sonra herhangi bir url tanımlanmazsa index componentini çalıştır.
        {path:'',redirectTo:'index',pathMatch:'full' }, 
        {path:'index',component:IndexComponent}, 
      ]
    },

    {path:'**',redirectTo:'login',pathMatch:'full'} ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
