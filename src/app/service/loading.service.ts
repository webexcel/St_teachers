import { Injectable } from '@angular/core';
// import { LoadingController} from '@ionic/angular';
// import {TranslateConfigService} from '../service/translate-config.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable()
export class LoadingService {
  loading: any;
  constructor(private ngxService: NgxUiLoaderService) {}

  present() {
    // this.translate.getparam('loader_msg').then(v=>this.startload(v))
    this.ngxService.start();
  }

  async startload(v: any) {
    // if(this.loading){
    //     await this.loading.dismiss()
    // }
    // this.loading = await this.loadingController.create({ message: v });
    // await this.loading.present()
  }

  async dismissAll() {
    // if(this.loading){
    //     await this.loading.dismiss()
    // }
    this.ngxService.stop();
  }
}
