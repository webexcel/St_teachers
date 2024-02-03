import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../service/auth.service';
import { StorageService } from '../service/storage.service';

import { DomSanitizer } from '@angular/platform-browser';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import {
  InAppBrowser,
  InAppBrowserOptions,
} from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Swiper } from 'swiper';
import { DataService } from '../service/data.service';
import { FilesService } from '../service/files.service';
import { LoadingService } from '../service/loading.service';
import { TranslateConfigService } from '../service/translate-config.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  ios: any = false;
  teachersDetail: any = this.storage.getjson('teachersDetail');
  @ViewChild('flash_template', { static: false }) flash_template: any;
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  flamessage: any;
  flashindex: any = 0;
  flashData: any;
  disabledValue: boolean = false;
  modalRef?: BsModalRef;
  storeSMSDetails: any = [];
  topMessages: any;
  ing: any = 0;
  // @TODO - get correct value
  ADNO: any = 0;

  public appPages = environment.pages;
  isModalOpen = false;
  modalImage: any;
  constructor(
    private modalService: BsModalService,
    private iab: InAppBrowser,
    private dataservice: DataService,
    private platform: Platform,
    private appMinimize: AppMinimize,
    private translate: TranslateConfigService,
    private router: Router,
    private route: ActivatedRoute,
    public authservice: AuthService,
    public storage: StorageService,
    public loading: LoadingService,
    private serfile: FilesService,
    public sanitizer: DomSanitizer
  ) {
    this.platform.backButton.subscribe(() => {
      let p = this.storage.get('page');
      if (p == 'dashboard') {
        this.appMinimize.minimize();
      }
    });
    this.topMessages = {
      status: true,
      message: 'Get All Messages Successfully',
      data: [
        {
          ADNO: 'KG108',
          SMSdate: '11,Jan-12:34',
          STUDENTNAME: 'Praburajan E',
          Message: 'G jgh thjldkhgk dhsg jhdjghjdsglhdsgh;a goawroowto hrwrye',
          event_image: 'https://demo.schooltree.in/uploads/demosch/af1.jpg',
        },
        {
          ADNO: 'KG108',
          SMSdate: '11,Jan-12:34',
          STUDENTNAME: 'Praburajan E',
          Message:
            'You have a homework to do today (2024-01-11) Check homework page',
          event_image: null,
        },
        {
          ADNO: 'KG108',
          SMSdate: '10,Jan-19:33',
          STUDENTNAME: 'Praburajan E',
          Message:
            'Dear Parents, Your Ward  Praburajan E  is Late for school today 10-01-2024 - Principal',
          event_image: null,
        },
      ],
    };
  }

  ngOnInit() {
    this.ios = this.authservice.isiso();
    this.dataservice.currentMenustatus.subscribe((index) => {
      this.translate.set();
    });
    this.getosversion();
    this.flashmessage();
    this.getSMSLogDetails();
  }

  go(url: any) {
    this.router.navigate([url]);
  }

  redirectToModule() {
    const moduleRoute = 'CircularsRoutingModule';
  }

  getosversion() {
    this.loading.present();
    this.authservice.get('getosversion').subscribe(
      (res: any) => {
        this.loading.dismissAll();
        if (res['status']) {
          if (res['data'].length > 0) {
            if (
              Number(res['data'][0]['version_code']) >
              Number(environment.version)
            ) {
              if (this.platform.is('ios')) {
                environment.packageid;
              }
              if (this.platform.is('android')) {
                this.storage.clear();
                const options: InAppBrowserOptions = {
                  zoom: 'no',
                };
                const browser = this.iab.create(
                  'https://play.google.com/store/apps/details?id=' +
                    environment.package,
                  '_system',
                  options
                );
                browser.on('loadstart');
              }
            }
          }
        }
      },
      (err) => {
        this.loading.dismissAll();

        console.log(err);
      }
    );
  }

  openmodel() {
    if (this.flashData.length > this.flashindex) {
      this.modalRef = this.modalService.show(this.flash_template);
    } else {
      this.storage.add('flash_close', 'ok');
      let flash_close = this.storage.get('flash_close');
    }
  }

  close() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
    this.flashindex = this.flashindex + 1;
    this.openmodel();
  }

  flashmessage() {
    let flashmes;

    this.flashData = new Array();
    this.authservice.post('getteacherflashmessage', {}).subscribe(
      (result: any) => {
        flashmes = result;
        console.log('result', flashmes);
        if (flashmes.status) {
          this.disabledValue = false;
          this.flashData = flashmes.data;
          var i = 0;
          for (i = 0; i < this.flashData.length; i++) {
            this.flashData[i].Discription = this.authservice.extractUrl(
              this.flashData[i].Discription
            );
          }
          this.flashindex = 0;
          if (this.flashData[0].Title != 'Update') {
            this.openmodel();
            this.disabledValue = false;
          }
        } else {
          this.disabledValue = true;
          this.storage.add('flash_close', 'ok');
          this.openmodel();
        }
      },
      (err) => {
        this.storage.add('flash_close', 'ok');
        this.openmodel();
      }
    );
  }

  checkview(v: any) {
    if (v == 'Y') {
      if (this.teachersDetail[0]['Is_Admin'] == 'Y') {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  getSMSLogDetails() {
    let detail = {
      staff_id: this.storage.getjson('teachersDetail')[0]['staff_id'],
      Is_Admin: this.teachersDetail[0]['Is_Admin'],
    };
    this.loading.present();
    this.authservice.post('getstaffmsg', detail).subscribe(
      (result: any) => {
        this.loading.dismissAll();
        this.storeSMSDetails = result['data'];
        this.ing = 0;
        this.getbase64();
      },
      (err) => {
        this.loading.dismissAll();
        //Connection failed message
      }
    );
  }

  getbase64() {
    try {
      if (this.ing < this.storeSMSDetails.length) {
        this.storeSMSDetails[this.ing].filename = '';

        let url = this.storeSMSDetails[this.ing].event_image;
        if (url && url.length > 0) {
          let l = url.split('/');
          let filename = l[l.length - 1];
          this.storeSMSDetails[this.ing].filename = filename;
          this.storeSMSDetails[this.ing].base64 = '';
          let f = this.serfile.checkfile(filename);
          if (f) {
            f.then(
              (res) => {
                this.serfile.read(filename).then(
                  (res) => {
                    if (res.split('base64,')[1].length != 0) {
                      this.storeSMSDetails[this.ing].base64 = res;
                    } else {
                      this.serfile.removefile(filename);
                      this.storeSMSDetails[this.ing].base64 = '';
                    }
                    this.ing = this.ing + 1;
                    this.getbase64();
                  },
                  (err) => {
                    this.ing = this.ing + 1;
                    this.getbase64();
                    console.log(err);
                  }
                );
              },
              (err) => {
                console.log(err);
                this.authservice
                  .post('getbase64', { url: encodeURI(url) })
                  .subscribe(
                    (res: any) => {
                      if (res) {
                        this.storeSMSDetails[this.ing].base64 = res['data'];
                        console.log(this.storeSMSDetails[this.ing].base64);
                        let k = this.serfile.download(filename, res['data']);
                        if (k) {
                          this.ing = this.ing + 1;
                          this.getbase64();
                        } else {
                          this.ing = this.ing + 1;
                          this.getbase64();
                        }
                      }
                    },
                    (err) => {
                      console.log(err);
                      this.storeSMSDetails[this.ing].base64 = '';
                      this.ing = this.ing + 1;
                      this.getbase64();
                    }
                  );
              }
            );
          } else {
            this.storeSMSDetails[this.ing].base64 = '';
            this.ing = this.ing + 1;
            this.getbase64();
          }
        } else {
          this.storeSMSDetails[this.ing].event_image = '';
          this.storeSMSDetails[this.ing].base64 = '';
          this.ing = this.ing + 1;
          this.getbase64();
        }
      }
    } catch (error) {
      console.log(error);
      this.storeSMSDetails[this.ing].base64 = '';
      this.ing = this.ing + 1;
      this.getbase64();
    }
  }

  checkimage(f: any) {
    if (f) {
      f = f.split('.');
      f = f[f.length - 1].toLowerCase();
      if (f != 'pdf' && f != 'mp3' && f != 'xls' && f != 'xlsx') {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
    //image.event_image.split('.')[image.event_image.split('.').length-1]!='pdf'
  }

  checkmp3(f: any) {
    if (f) {
      f = f.split('.');
      f = f[f.length - 1].toLowerCase();
      if (f == 'mp3') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  checkxls(f: any) {
    if (f) {
      f = f.split('.');
      f = f[f.length - 1].toLowerCase();
      if (f == 'xls' || f == 'xlsx') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  checkpdf(f: any) {
    if (f) {
      f = f.split('.');
      f = f[f.length - 1].toLowerCase();
      if (f == 'pdf') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getfilename(f: any) {
    f = f.split('/');
    f = f[f.length - 1];
    return f;
  }

  setOpen(isOpen: boolean, image: any) {
    console.log(image);
    this.modalImage = image;
    this.isModalOpen = isOpen;
  }

  checkmp4(f: any) {
    if (f) {
      f = f.split('.');
      f = f[f.length - 1].toLowerCase();
      if (f == 'mp4') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  getSafeUrl(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  goNext() {
    this.swiper?.slideNext();
  }

  goPrev() {
    this.swiper?.slidePrev();
  }
}
