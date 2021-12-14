import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProtectGuard implements CanActivate {

  constructor(
    private $router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('pro')
    const accessToken = localStorage.getItem('token');
    console.log(accessToken, 'accesstoken')
    if (accessToken != null) {
      console.log("in if protect guard")
      this.$router.navigate(['/home/list']);
      return false;
    }
    console.log("else")
    return true;
  }
}