import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {

  constructor(
    private translate: TranslateService,
    private storage: StorageService
  ) {
   }

   set(){
     let laun = this.storage.get('laun')
     if(laun){
       this.translate.use(laun)
     }else{
       this.translate.use('en')
     }
   }

  setLanguage(setLang:any) {
    this.translate.use(setLang);
  }

  getparam(param:any){
    return this.translate.get(param).toPromise()
  }
}
