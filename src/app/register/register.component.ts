import { Component, OnInit } from '@angular/core';

// import form control, form group and form validation
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  private loading: boolean = false

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password:  new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}'),])
  })

  get email(){return this.registerForm.get('email')}

  get password(){return this.registerForm.get('password')}

  onSubmit() {
    // create the register object 
    this.loading = true

    let userDetails = {
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value
    }

    this._auth.registerUser(userDetails)
    .subscribe(
      res => {
        // get the user details and store user in a local storage
        this.loading = false
        localStorage.setItem("user", JSON.stringify(res))

        // redirect thr user to the homepage
        this._router.navigate(['/login'])
      },
      err => {
        this.loading = false
        console.log(err)
      }
    )
  }

}
