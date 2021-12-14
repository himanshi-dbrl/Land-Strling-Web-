import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [HomeComponent, MapComponent, AddPropertyComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBehBWQ-w5c9bJsF8c7HL2_G6wliH6J6Fs',
      // libraries: ['Places API']
    })
  ]
})
//AIzaSyBehBWQ-w5c9bJsF8c7HL2_G6wliH6J6Fs
//my cred
//AIzaSyBYjWGPqY_9xDx_z1o9raL8INOPl_5MRnU
export class HomeModule { }
