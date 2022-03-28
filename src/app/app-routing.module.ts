import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import components
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { UsersComponent } from './users/users.component'
import { ProfileComponent } from './profile/profile.component'
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: UsersComponent, canActivate:[AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate :[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, RegisterComponent, UsersComponent]
