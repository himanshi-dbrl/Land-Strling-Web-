import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/modules/service/home.service';
import { MatSnackBar } from '@angular/material/snack-bar';
declare var $: any;
import * as recordrtc from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  myFiles: string[] = [];
  addProperty: FormGroup;
  submitted: boolean = false;
  lat: any;
  lng: any;
  address: any;
  title = 'micRecorder';
  //google: any;
  //Lets declare Record OBJ
  record;
  //Will use this flag for toggeling recording
  recording = false;
  //URL of Blob
  url;
  error;
  //will use this for getting current location

  zoom: any;
  currentLocation: any;

  constructor(private formBuilder: FormBuilder,
    private _router: Router,
    private domSanitizer: DomSanitizer,
    private homeService: HomeService,
    private mapsAPIloader: MapsAPILoader,
    private mat: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.buildForm();
    this.getLocation();
    this.getCurrentLocation();

  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
  /**
  * Start recording.
  */
  initiateRecording() {
    this.recording = true;
    let mediaConstraints = {
      video: false,
      audio: true
    };
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  /**
 * Will be called automatically.
 */
  successCallback(stream) {
    var options = {
      mimeType: "audio/wav",
      numberOfAudioChannels: 1,
      sampleRate: 48000,
    };
    //Start Actuall Recording
    var StereoAudioRecorder = recordrtc.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }
  /**
  * Stop recording.
  */
  stopRecording() {
    this.recording = false;
    this.record.stop(this.processRecording.bind(this));
  }
  /**
  * processRecording Do what ever you want with blob
  * @param  {any} blob Blog
  */
  processRecording(blob) {
    this.url = URL.createObjectURL(blob);
    console.log("blob", blob);
    console.log("url", this.url);
  }
  /**
  * Process Error.
  */
  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }


  buildForm() {
    this.addProperty = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      property_use: ['', [Validators.required, Validators.minLength(3)]],
      investment_type: ['', Validators.required],
      l_s_service: ['', Validators.required],
      property_type: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      country: ['', [Validators.required]],
      area: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      title2: ['', [Validators.required]],
      image: ['', [Validators.required]]


    });
  }



  getLocation() {
    this.homeService.getUserLocation().then(res => {
      console.log(res);
      this.lat = res.lat,
        this.lng = res.lng
    });
  }

  getCurrentLocation() {
    console.log('start');
    this.mapsAPIloader.load().then(() => {
      console.log('enter on loading');
      let geocoder = new google.maps.Geocoder;
      let latlng = {
        lat: this.lat,
        lng: this.lng
      };
      console.log('latlong is', latlng);
      let that = this;
      geocoder.geocode({
        'location': latlng
      }, function (results) {
        console.log('enter on geocoder func');
        if (results[0]) {
          that.currentLocation = results[0].address_components;
          console.log(results[0].address_components);
          //set values in input of their respective
          this.addProperty.patchValue({
            country: this.currentLocation[7].long_name,
            zip: this.currentLocation[8].long_name,
            area: this.currentLocation[2].long_name,
            city: this.currentLocation[4].long_name,
            address: results[0].formatted_address,
          });
        } else {
          console.log('No results found');
        }
      });
    });
  }


  saveDetails() {
    this.submitted = true;
    if (this.addProperty.invalid) {
      console.log('error');
      console.log(this.addProperty.errors);
      return;

    }
    console.log('succss');
    console.log(this.addProperty.value);
    // const token = localStorage.getItem('token');
    // let decode: any = JwtService.DecodeToken(token);
    // const frmData = new FormData();
    // frmData.append("title", this.addProperty.value.title);
    // frmData.append("property_use", this.addProperty.value.property_use);
    // frmData.append("investment_type", this.addProperty.value.investment_type);
    // frmData.append("l_s_service", this.addProperty.value.l_s_service);
    // frmData.append("property_type", this.addProperty.value.property_type);
    // frmData.append("title2", this.addProperty.value.title2);
    // frmData.append('zip', this.addProperty.value.zip);
    // frmData.append('area', this.addProperty.value.area);
    // frmData.append('city', this.addProperty.value.city);
    // frmData.append('address', this.addProperty.value.address);
    // frmData.append("audio_data", this.url);
    //  frmData.append("tribe_icon",this.postBlogForm.value.icon)

    let data = {
      "Property": {
        "title": this.addProperty.value.title,
        "propertyUse": this.addProperty.value.property_use,
        "investmentType": this.addProperty.value.investment_type,
        "LSService": this.addProperty.value.l_s_service,
        "propertyType": this.addProperty.value.property_type,
        "lati": "",
        "longi": "",
        "address": this.addProperty.value.address,
        "city": this.addProperty.value.city,
        "area": this.addProperty.value.area,
        "country": "Saudi Arabia",
        "UserId": "0054K000001ImFw"
      }
    }
    this.homeService.addProperty(data).subscribe(res => {
      console.log('res is', data);
      this.mat.open('Property added successfully', 'Cancel', {
        duration: 5000
      })
      this._router.navigate(['/home/list'])
    });
    // console.log(frmData);
    // for (var i = 0; i < this.myFiles.length; i++) {
    //   frmData.append("image", this.myFiles[i]);
    // }


  }

  get f() {
    return this.addProperty.controls;
  }

  cancel() {
    this._router.navigate(['/home/add-property'])
  }
  getFileDetails(e) {
    console.log('enter');
    console.log(e.target.files);
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
  }
  //get full address from lat long 

}
