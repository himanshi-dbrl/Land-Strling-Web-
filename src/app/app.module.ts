import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { LoginPasswordComponent } from './login-password/login-password.component';
import { HttpClientModule } from '@angular/common/http';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { AngularmaterialModule } from './modules/angularmaterial/angularmaterial.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
//import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AppComponent, LoginComponent, LoginPasswordComponent, ForgetPasswordComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // MatSnackBar,
    //AngularmaterialModule
    //  MatDialog,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [],
  //exports: [AngularmaterialModule],
  bootstrap: [AppComponent],

})
export class AppModule { }
