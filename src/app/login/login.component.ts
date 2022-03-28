import { Component, OnInit } from '@angular/core';

// import form control, form group and form validation
import { FormControl, FormGroup, Validators } from '@angular/forms'

// import tje authServeice
import { AuthService } from '../auth.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password:  new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}'),])
  })

  get email(){return this.loginForm.get('email')}

  get password(){return this.loginForm.get('password')}

  onSubmit() {

    // create the login object
    let userDetails = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get("password")?.value
    }


    this._auth.loginUser(userDetails)
    .subscribe(
      res => {
        console.log(res)
        localStorage.setItem("token", res.token)
        this._router.navigate(['/'])
      },
      err => {
        console.log(err)
      }
    )
  }
}
