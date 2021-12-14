import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpcommanService } from 'src/app/services/httpshared.service';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient,
    private httpService: HttpcommanService
  ) { }

  getUserLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({
          lng: resp.coords.longitude,
          lat: resp.coords.latitude
        });
      });
    })
  }

  getListedProperty(userId: any) {
    return this.http.get(`https://partial-land-sterling.cs81.force.com/LandsterlingWebapp/services/apexrest/LandSterling?UserId=${userId}`);
  }


  addProperty(data: any) {
    console.log('data is', data)
    return this.http.post('https://partial-land-sterling.cs81.force.com/LandsterlingWebapp/services/apexrest/LandSterling', data);
  }
}
