import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AddListingComponent } from './components/add-listing/add-listing.component';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: 'list', component: HomeComponent },
  { path: 'add-property', component: AddPropertyComponent },
  { path: 'map', component: MapComponent },
  { path: 'profile', component: ProfileComponent },
  // { path: 'all', component: AddListingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
