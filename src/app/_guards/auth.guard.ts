import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { StorageService } from '../service/storage.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Guard implements CanActivate {
  constructor(public router: Router, private storage: StorageService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
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
  constructor(public router: Router, private storage: StorageService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const val = this.storage.getjson('teachersDetail');
    if (val) {
      return this.router.createUrlTree(['dashboard']); // Use createUrlTree to return a UrlTree
    } else {
      return true;
    }
  }
}
