import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {
  addproperty: FormGroup;

  constructor(private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.buildForm()
  }
  buildForm() {
    this.addproperty = this.formBuilder.group({ 
      // email: ['', [Validators.required, Validators.email]],
    });
  }
}
