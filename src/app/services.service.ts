import { Injectable } from '@angular/core';
import { HttpcommanService } from './services/httpshared.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  static email: any;

  constructor(private httpService: HttpcommanService) { }

  verify(data: any) {
    console.log('data', data);

    return this.httpService.postCall("web/user/forgot", data);
  }
  changepass(data:any){
    return this.httpService.patchCall("web/user/change-password", data);
  }
  getUserDetailsByEmail(email:any){
    return this.httpService.getCall(`admin/user/get-user-by-id/?email=${email}`);
  }

  edituserprofile(data:any){
    return this.httpService.putCall("web/user/edituserprofile", data);
  }
}
