import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { GlobalService } from './_services/global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private globals: GlobalService, private router: Router) {

  }

  canActivate(){
      if(this.globals.currentCredentials == null) {
        this.router.navigate(['']);
        return false;
      }
      else {
        return true;
      }
  }
}
