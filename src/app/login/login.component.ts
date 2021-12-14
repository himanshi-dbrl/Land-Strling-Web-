import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private loginSerive: LoginService) { }

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  moveToPassword() {
    console.log("called");
    this.submitted = true;
    if (this.loginForm.invalid) {
      console.log('invalid')
      return;
    } else {
      LoginService.email = this.loginForm.value.email
      console.log("email is", LoginService.email);
      this.loginSerive.getUserName().subscribe(res => {
        console.log('res is', res);
        LoginService.userData = res.data.user;
        this.router.navigate(['/password']);
      })

    }


  }
}
