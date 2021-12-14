import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { HttpcommanService } from "./httpshared.service";
@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private httpService: HttpcommanService
  ) { }

  static email: any;
  static userData: any;
  getUserName() {
    return this.httpService.getCall(`/web/user/get-user-name/${LoginService.email}`);
  }

  login(data) {
    console.log(data);
    return this.httpService.postCall("/web/user/login", data);
  }
}
