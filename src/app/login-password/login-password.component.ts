import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login-password',
  templateUrl: './login-password.component.html',
  styleUrls: ['./login-password.component.css']
})
export class LoginPasswordComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  firstName: string;
  lastName: string;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private loginSerive: LoginService,
    private mat: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.buildForm();
    if (LoginService.email == null || !LoginService.email) {
      this.router.navigate(['/login']);
    }
    if (LoginService.userData) {
      this.firstName = LoginService.userData.first_name
    }
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      console.log('invalid')
      return;
    } else {
      let data = {
        email: LoginService.email,
        password: this.loginForm.value.password
      }
      console.log("email is", data);
      this.loginSerive.login(data).subscribe(res => {
        console.log('res is', res);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', res.data.token);
        this.router.navigate(['/home/list'])
      }, (err => {
        this.mat.open(err.error.message, 'Cancel', {
          duration: 5000
        })
      }));
      //this.router.navigate(['/home']);
    }
  }
}
