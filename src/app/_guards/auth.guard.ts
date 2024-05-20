import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { StorageService } from '../service/storage.service';

@Injectable({ providedIn: 'root' })
export class Guard implements CanActivate {
  constructor(public router: Router, private storage: StorageService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const val = this.storage.getjson('teachersDetail');
    if (!val) {
      return this.router.createUrlTree(['login']); // Use createUrlTree to return a UrlTree
    } else {
      return true;
    }
  }
}

@Injectable({ providedIn: 'root' })
export class loginGuard implements CanActivate {
  constructor(
    private appComponent: AppComponent,
    public router: Router,
    private storage: StorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const val = this.storage.getjson('teachersDetail');
    if (val) {
      return this.router.createUrlTree(['dashboard']); // Use createUrlTree to return a UrlTree
    } else {
      return true;
    }
  }
}
