import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, APP_BOOTSTRAP_LISTENER, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
//import * as $ from 'jquery';
import { fromEvent } from 'rxjs';
import { HomeService } from 'src/app/modules/service/home.service';

import { AddPropertyComponent } from '../add-property/add-property.component';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  
  showHeadFilter: boolean = false;
  showFooterFilter: boolean = false;
  showSidebarFilter: boolean = false;
  lat: any;
  lng: any;
  latit: any;
  lngit: any;
  mark = [];
  FooterData: any;
  modalData: any='';
  city: string = null;
  country: string = null;
  state: string = null;
  propertyUse: string = null;
  propertyType: string = null;
  propertyStatus: string = null;
  investmentType:string=null;
 bedroom:number=null;
  selectedLat: number = 0;
  selectedLng: number = 0;
  tableResponse:object;
  userId: any = '0054K000001ImFw';
  latitude: number ;
  longitude: number;
  showModalBox: boolean = false;
  map:any;
  constructor(
    // public dialog: MatDialog
    private http: HttpClient,
    public dialog: MatDialog,
    private router: Router,
    private homeService: HomeService,
    private mapsAPIloader: MapsAPILoader,
    

  ) {}

  ngOnInit(): void {
    this.getPropertyList();
    // this.homeService.getListedProperty().subscribe(res => {
    //   console.log("all property is", res);
    // })
    let res = this.homeService.getUserLocation().then((res) => {
      console.log('res is', res);
      this.latit = res.lat;
      this.lngit = res.lng;
    });
  }

  ngAfterViewInit(): void {
    this.onDoubleClickMap();
  }

  markers = [
    {
      lat: 21.1594627,
      lng: 72.6822083,
      label: 'Surat',
      iconUrl:
        'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|4286f4',
    },

    {
      lat: 23.0204978,
      lng: 72.4396548,
      label: 'Ahmedabad',
      iconUrl:
        'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|4286f4',
    },
    {
      lat: 22.2736308,
      lng: 70.7512555,
      label: 'Rajkot',
      iconUrl:
        'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FD0002',
    },
  ];

  onDoubleClickMap() {
    // var myLatlng = new google.maps.LatLng(41.38,2.18);    
    //  var cmap;
    this.mapsAPIloader.load().then(() => {
      var myOptions = {
        zoom: 13,
  //       center: myLatlng,
    //    mapTypeId:  google.maps.MapTypeId.ROADMAP
       }
      console.log('enter on loading');
//      let geocoder = new google.maps.Geocoder;
 //   let map = new google.maps.Map(document.getElementById("map"),myOptions);
  // this.map = document.getElementById('map');
//   google.maps.event.addListener(this.map, 'dblclick', function(event) {
      
//     alert(event.latLng);
// });
   //  fromEvent(this.map, 'dblclick').subscribe((event) => { console.log('fff');
      // var lonlat;
      // map.on('click', function(e) {
      //   lonlat = e.coordinate;
      //   console.log(lonlat);
      // });
      
    //  console.log('cmap',cmap);
    //  this.homeService.getUserPointerLocation(this.map).then(res => {
    //   console.log('res',res);
    //     this.lat = res.lat,
    //     this.lng = res.lng
    //     console.log('latlng',this.lat,this.lng);
    //   });
   //  });
    });
     

    //  const map = document.getElementById('map');
       //fromEvent(map, 'dblclick').subscribe((event) => {
    //     if(confirm("Are you sure to add the property")) {
    //     console.log('event',event);
    //     this.router.navigate(['/home/add-property']);
    //     }
    //   });
    }
    
  

  getPropertyList() {
    this.homeService
      .getListedProperty({
        UserId: this.userId,
        city: this.city,
        country: this.country,
        propertyTypes: this.propertyType,
        propertyUse: this.propertyUse,
        stage: this.propertyStatus,
      })
      .subscribe((data) => {
        console.log('property data', data);
        this.setMarkers(data);
      });
  }

  onCountryChnage(event: any) {
    this.country = event.target.value;
    console.log(this.country);
    this.getPropertyList();
  }
  onCityChnage(event: any) {
    this.city = event.target.value;
    console.log(this.city);
    this.getPropertyList();
  }
  onPropertyChnage(event: any) {
    this.propertyUse = event.target.value;
    console.log(this.propertyUse);
    this.getPropertyList();
  }
  onTypeChnage(event: any) {
    this.propertyType = event.target.value;
    console.log(this.propertyType);
    this.getPropertyList();
  }
  onStatusChnage(event: any) {
    this.propertyStatus = event.target.value;
    console.log(this.propertyStatus);
    this.getPropertyList();
  }
 

  openAddPropertyForm() {
    console.log('called property');
    this.router.navigate(['/home/add-property']);
    // this.dialog.open(AddPropertyComponent);
    // this.dialog.open(AddPropertyComponent,
    //   {
    //     width: '750px',
    //     height: '750px'
    //   }
    // )
  }

  changeHeadFilter() {
    this.showFooterFilter = false;
    this.showHeadFilter = true;
  }

  changeFooterFilter() {
    this.showHeadFilter = false;
    this.showFooterFilter = true;
    this.getPropertyListTable();
  }

  private setMarkers(reson) {
   this.mark=[];
    for (let data of reson.data) {
      
    var ov;     
      ov = {
        lat: this.latit,
        lng: this.lngit,
        label: 'Current Location',
        iconUrl:
          'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FD0002',
      };
      this.mark.push(ov);
      if (data) {
        ov = {
          lat: data.pba__Latitude_pb__c,
          lng: data.pba__Longitude_pb__c,
          label: data.pba__City_pb__c,
          iconUrl:
            'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|4286f4',
        };
        this.mark.push(ov);
      }
    }
    console.log(this.mark); 
  }

  markerClicked(lat: number, lng: number) {
    this.modalData='';
    this.showSidebarFilter = false;
   // this.showModalBox = true;
    this.selectedLat = lat;
    this.selectedLng = lng;
    console.log('getting clicked address latitude', this.selectedLat);
    console.log('getting clicked address longitude', this.selectedLng);
    this.homeService
    .getListedProperty({
      UserId: this.userId,
      latitude: this.selectedLat,
      longitude: this.selectedLng,
    })
    .subscribe((res:any) => {
  
        console.log('our data is', res);
        if (res) {
        
         // this.showSidebarFilter = true;
          console.log('modalbox',this.showModalBox);
         // this.showModalBox = true;
          console.log('modalbox',this.showModalBox);

          this.FooterData = '';
          
          var length:number=0;
          length=res.data.length; console.log("length",length);
          this.showModalBox = true;
          this.modalData = res.data[0];
          $("#myModal").modal('show');
          if(length>1){ 
            this.showSidebarFilter = true;
          this.FooterData = res.data;
          }
          console.log('modaldata',this.modalData);
          console.log('footerData',this.FooterData);
        }
      });
  }

  getPropertyListTable() {
   
    this.homeService
      .getListedProperty({
        UserId: this.userId,
        city: this.city,
        country: this.country,
        propertyTypes: this.propertyType,
        propertyUse: this.propertyUse,
        stage: this.propertyStatus,
        bedroomSize:this.bedroom ,
        investmentType:this.investmentType,
      })
      .subscribe((data:any) => {
        console.log('property data', data);
        this.tableResponse=data.data;
        console.log('tblerspnse',this.tableResponse);
      });
  }

  onCountryChnage2(event: any) {
    this.country = event.target.value;
    console.log('second_country',this.country);
    this.getPropertyListTable();
  }
  onCityChnage2(event: any) {
    this.city = event.target.value;
    console.log(this.city);
    this.getPropertyListTable();
  }
  onPropertyChnage2(event: any) {
    this.propertyUse = event.target.value;
    console.log(this.propertyUse);
    this.getPropertyListTable();
  }
  onTypeChnage2(event: any) {
    this.propertyType = event.target.value;
    console.log(this.propertyType);
    this.getPropertyListTable();
  }
  onStatusChnage2(event: any) {
    this.propertyStatus = event.target.value;
    console.log(this.propertyStatus);
    this.getPropertyListTable();
  }
  onBedroomChnage2(event: any) {
    this.bedroom = event.target.value;
    console.log(this.propertyStatus);
    this.getPropertyListTable();
  }
  onInvestmentChnage2(event: any) {
    this.investmentType = event.target.value;
    console.log(this.propertyStatus);
    this.getPropertyListTable();
  }

  closeclick($event){
    this.modalData=null;
  }

  
}
