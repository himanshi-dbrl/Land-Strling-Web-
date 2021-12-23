import { Component } from '@angular/core';
import * as AOS from 'aos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'landsterling-webapp';
  constructor(
    private router: Router,
  ){}
  ngOnInit() {
    AOS.init();
  }

  profile(){
    this.router.navigate(['/home/profile']);
  }
}
