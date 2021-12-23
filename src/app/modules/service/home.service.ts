import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
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

  getUserPointerLocation(map):Promise<any>{console.log(map);
    return new Promise((resolve,reject)=>{
      google.maps.event.addListener(map, 'click', function(event) {
    
        alert(event.latLng);
    });
    })
  }

  getListedProperty(
    filters: {
      UserId: any,
      country?: string,
      city?: string,
      bedroomSize?: number;
      propertyTypes?: string,
      investmentType?: string,
      stage?: string,
      propertyUse?:string,
      latitude?:number,
      longitude?:number
    }
  ) {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        if (typeof filters[key] === 'number') {
          params = params.set(key, filters[key].toString())
        }
        else {
          params = params.set(key, filters[key]);
        }
      }
    })
    console.log('params',params);
    return this.http.get(`https://partial-land-sterling.cs81.force.com/LandsterlingWebapp/services/apexrest/LandSterling`, { params });
  }


  addProperty(data: any) {
    console.log('data is', data)
    return this.http.post('https://partial-land-sterling.cs81.force.com/LandsterlingWebapp/services/apexrest/LandSterling', data);
  }
}
