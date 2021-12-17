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
   FooterData:any;

  

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
    let res = this.homeService.getUserLocation().then(res => {
      console.log('res is', res);
      this.latit = res.lat;
      this.lngit = res.lng;
    });
    this.homeService.getListedProperty({UserId:"0054K000001ImFw"}).subscribe(res => {

      console.log("all property is", res);
      //console.log("all property is", res.data[0].pba__Longitude_pb__c); 
      var reson:any=res;
      for (let data of reson.data) { 
        console.log(data);
        var ov;        
        ov=
          { 
           lat: this.latit,
           lng: this.lngit,
           label: 'Current Location',
           iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FD0002",         
         };        
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

  onCountryChnage(e: any) {
    console.log('country is', e.target.value)
    this.country = e.target.value;
    if (this.country) {
      this.http.get(`https://partial-land-sterling.cs81.force.com/LandsterlingWebapp/services/apexrest/LandSterling?UserId=0054K000001L99mQAC
      &country=${this.country}`).subscribe(res => {
        console.log('res is', res);
      })
    }

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
    this.showFooterFilter = false;
  this.selectedLat = lat;
  this.selectedLng = lng;
  console.log('getting clicked address latitude',this.selectedLat );
  console.log('getting clicked address longitude',this.selectedLng);

  this.http.get(`https://partial-land-sterling.cs81.force.com/LandsterlingWebapp/services/apexrest/LandSterling?UserId=0054K000001L99mQAC&longitude=${this.selectedLat}&latitude=${this.selectedLng}`).subscribe((res:any) => {
  console.log('our data is', res);
  if(res)
  { 
  this.showFooterFilter = true;
  this.FooterData="";
  this.FooterData=res.data;
  console.log(this.FooterData); 

  }
  
    })
  }

  
}
