import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import components
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { UsersComponent } from './users/users.component'
import { ProfileComponent } from './profile/profile.component'

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: UsersComponent},
  {path: 'profile', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, RegisterComponent, UsersComponent]
