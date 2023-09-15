import { Component, OnInit } from '@angular/core';
import {TranslateConfigService} from '../service/translate-config.service';
import { StorageService } from "../service/storage.service";
import { DataService } from "../service/data.service";
import { Router} from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {
  ios:any=false
  laun:any;
  constructor(private platform: Platform, private router: Router,private translate: TranslateConfigService,private storage:StorageService, private dataservice:DataService,public authservice:AuthService) { 
    this.platform.backButton.subscribe(() => {
      this.router.navigate(['/dashboard']);
    })
  }

  ngOnInit() {
    this.ios=this.authservice.isiso()
    this.translate.set()
    this.laun = this.storage.get('laun')
    if(!this.laun){
      this.laun = 'en'
    }
  }

  save(){
    this.storage.add('laun',this.laun)
    this.translate.set()
    this.dataservice.changeMenustatus(true)
  }

}
