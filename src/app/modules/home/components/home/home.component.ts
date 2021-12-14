import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPropertyComponent } from '../add-property/add-property.component';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/modules/service/home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showHeadFilter: boolean = false
  showFooterFilter: boolean = false;
  lat: any;
  lng: any;
  constructor(
    // public dialog: MatDialog
    public dialog: MatDialog,
    private router: Router,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.homeService.getListedProperty('0054K000001ImFw').subscribe(res => {
      console.log("all property is", res);
    })
    let res = this.homeService.getUserLocation().then(res => {
      console.log('res is', res);
      this.lat = res.lat;
      this.lng = res.lng;
    });
  }


  markers = [

    {
      lat: 21.1594627,
      lng: 72.6822083,
      label: 'Surat',
      iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|4286f4"
    },

    {
      lat: 23.0204978,
      lng: 72.4396548,
      label: 'Ahmedabad',
      iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|4286f4"
    },
    {
      lat: 22.2736308,
      lng: 70.7512555,
      label: 'Rajkot',
      iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FD0002"
    }

  ];

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
}
