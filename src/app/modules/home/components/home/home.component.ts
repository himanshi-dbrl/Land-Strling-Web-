import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { HomeService } from 'src/app/modules/service/home.service';

import { AddPropertyComponent } from '../add-property/add-property.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  showHeadFilter: boolean = false
  showFooterFilter: boolean = false;
  lat: any;
  lng: any;
  latit: any;
  lngit: any;
   mark =[];

  
  data: object = null;
  city: string = null;
  country: string = null;
  state: string = null;
  propertyUse: string = null;
  propertyType: string = null;
  propertyStatus: string = null;
  userId: any = '0054K000001L99mQAC';
  selectedLat: Number = 0;
selectedLng: Number = 0;
  constructor(
    // public dialog: MatDialog
    private http: HttpClient,
    public dialog: MatDialog,
    private router: Router,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
<<<<<<< HEAD
    let res = this.homeService.getUserLocation().then(res => {
      console.log('res is', res);
      this.latit = res.lat;
      this.lngit = res.lng;
    });
    this.homeService.getListedProperty('0054K000001L99mQAC').subscribe(res => {
      console.log("all property is", res);
 
      //console.log("all property is", res.data[0].pba__Longitude_pb__c); 
       var i=1;
      for (let data of res.data) { 
        console.log(data);
        var ov;
        
        ov=
          { 
           lat: this.latit,
           lng: this.lngit,
           label: '',
           iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FD0002",
            no:i
         };
         i++;
          this.mark.push(ov);
        if(data){
          ov={
                lat:data.pba__Latitude_pb__c,
                lng:data.pba__Longitude_pb__c,
                label: data.pba__City_pb__c,
                iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|4286f4"
          } 
          this.mark.push(ov);

        }


       }
       console.log("our final outpt is",this.mark);

    })
=======
    this.getPropertyList();
    // this.homeService.getListedProperty().subscribe(res => {
    //   console.log("all property is", res);
    // })
    let res = this.homeService.getUserLocation().then(res => {
      console.log('res is', res);
      this.lat = res.lat;
      this.lng = res.lng;
    });
>>>>>>> axay-work
  }

 

  ngAfterViewInit(): void {
    this.onDoubleClickMap();
  }
 

  onDoubleClickMap() {

    const map = document.getElementById('map');
    fromEvent(map, 'dblclick').subscribe(event => {
      console.log(event);
      this.router.navigate(['/home/add-property']);
    })
  }

  getPropertyList() {

    this.homeService.getListedProperty({
      UserId: this.userId,
      city: this.city,
      country: this.country
    }).subscribe(data => {
      console.log('property data', data);
    })
  }

  onCountryChnage(event: any) {
    this.country = event.target.value;
    this.getPropertyList();
  }


  openAddPropertyForm() {
    console.log('called property')
    this.router.navigate(['/home/add-property'])
    // this.dialog.open(AddPropertyComponent);
    // this.dialog.open(AddPropertyComponent,
    //   {
    //     width: '750px',
    //     height: '750px'
    //   }
    // )
  }

  changeHeadFilter() {
    this.showFooterFilter = false
    this.showHeadFilter = true
  }

  changeFooterFilter() {
    this.showHeadFilter = false
    this.showFooterFilter = true;
  }

  markerClicked(lat:number,lng:number){
this.selectedLat = lat;
this.selectedLng = lng;
console.log('getting clicked address latitude',this.selectedLat );
console.log('getting clicked address longitude',this.selectedLng);
  console.log('enter' )  ;
  }

  
}
