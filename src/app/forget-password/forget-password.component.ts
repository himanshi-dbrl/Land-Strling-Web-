import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import   Swal  from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  invalid: any = true;
  email_id: any;

  constructor(private _services:ServicesService) { }

  ngOnInit(): void {
    console.log("hellow")
  }

  verify(email_id){
    
    let verifyData = {
      email_id: this.email_id,
    };
    let formData = new FormData();
    formData.append('email_id',verifyData.email_id)
    this._services.verify(formData).subscribe(result =>{
     console.log(result);
      //let result = {
        //status:200
      //}
      if (result.status==200) {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: false
        });
    
        swalWithBootstrapButtons
          .fire({
            title: "OTP sent to your registered email.",
            icon: "success",
            confirmButtonText: "Very OTP",
            reverseButtons: false
          })
          .then(result => {
            if (result.value) {
                console.log('verify otp screen',result.value);
                ServicesService.email_id = email_id
                console.log('V',ServicesService.email_id);
                
                // this._route.navigate(['/verify'])
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            }
          });
      }else this.invalid = false;
    }, err => {
     this.invalid = false;
    }
    )
    
  }

}
