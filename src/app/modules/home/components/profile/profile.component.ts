import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData:[];
  imagepath = environment.imagePath;
  userDetailsForm:FormGroup;
  currentpassword: any;
  newpassword: any;
  confirmpassword: any;
  invalid: boolean;
  profile_pic: any;
  first_name: string;
  last_name: string;
  email:string;
  mobile: string;
  job_title: string;
  company: string;
  city: string;
  country: string;


  constructor(
    private router: Router,
    private services: ServicesService
  ) { }

  ngOnInit(): void {
  }

  getUserData() {
    this.services.getUserDetailsByEmail(ServicesService.email).subscribe(res => {
      console.log('res is', res.data);
      this.profile_pic= res.data.user.profile_pic ? res.data.user.first_name : this.imagepath;
      this.first_name = res.data.user.first_name ? res.data.user.first_name : 'NA';
      this.last_name = res.data.user.last_name ? res.data.user.last_name : 'NA';
      this.email = res.data.user.email ? res.data.user.email : 'NA';
      this.mobile = res.data.user.mobile ? res.data.user.mobile : 'NA';
      this.job_title = res.data.user.job_title ? res.data.user.job_title : 'NA';
      this.company = res.data.user.company ? res.data.user.company : 'NA';
      this.city = res.data.user.city ? res.data.user.city : 'NA';
      this.country = res.data.user.country ? res.data.user.country : 'NA';
      return new Promise((resolve, reject) => {
        console.log(">>>", this.email);
        resolve(this.fillForm());
      })
    })

  }

  fillForm() {
    this.userDetailsForm.patchValue({
      "first_name": this.first_name,
      "last_name": this.last_name,
      "email": this.email,
      "mobile": this.mobile,
      "job_title": this.job_title,
      "company": this.company,
      "city": this.city,
      "country": this.country
    });
  }

  editprofile() {
    let formData = new FormData();
    formData.append('profile_pic', this.profile_pic);
    formData.append('first_name', this.first_name);
    formData.append('last_name', this.last_name);
    formData.append('mobile', this.mobile);
    formData.append('job_title', this.job_title);
    formData.append('company', this.company);
    formData.append('city', this.city);
    formData.append('country', this.country);
    this.services.edituserprofile(formData).subscribe(result => {
      if (result.status == 201) {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: false
        });

        swalWithBootstrapButtons
          .fire({
            title: "New password created successfully.",
            icon: "success",
            confirmButtonText: "Go To Home Page",
            reverseButtons: false
          })
          .then(result => {
            if (result.value) {
              this.router.navigate(['/home'])
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            }
          });
      }
    })
  }

  changepass() {

    let formData = new FormData();
    formData.append('currentpassword', this.currentpassword);
    formData.append('newpassword', this.newpassword);
    formData.append('confirmpassword', this.confirmpassword);
    this.services.changepass(formData).subscribe(result => {
      console.log(result);
      //  let result = {
      //   status:200
      // }
      if (result.status == 200) {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: false
        });

        swalWithBootstrapButtons
          .fire({
            title: "New password created successfully.",
            icon: "success",
            confirmButtonText: "Go To Home Page",
            reverseButtons: false
          })
          .then(result => {
            if (result.value) {
              this.router.navigate(['/Home'])
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            }
          });
      } else this.invalid = false;
    }, err => {
      this.invalid = false;
    }
    )
  }

  save() {
    if (this.profile_pic||this.first_name || this.last_name || this.mobile ||this.job_title||this.city||this.company||this.country) {
      this.editprofile();
    } else {
      this.changepass()
    }
  }

}


