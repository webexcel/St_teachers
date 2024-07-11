import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../service/auth.service';
import { FilesService } from '../service/files.service';
import { LoadingService } from '../service/loading.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  ing: any = 0;
  storeSMSDetails: any = [1, 2, 3, 4];
  teachersDetail: any = this.storage.getjson('teachersDetail');
  isModalOpen = false;
  modalImage: any;
  grpmes: any;
  senditems: any;
  last3days: any[] = [];

  constructor(
    public storage: StorageService,
    public authservice: AuthService,
    public loading: LoadingService,
    private serfile: FilesService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getgroupMessage();
    this.getSMSLogDetails();
  }

  get reversedLast3days(): any[] {
    return this.last3days.slice().reverse();
  }

  extractUrl(text: string) {
    var urlRegex =
      /(https?:\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)|((?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/g;
    return text.replace(urlRegex, function (url) {
      return (
        '<a href="' +
        (url.startsWith('http') ? url : 'http://' + url) +
        '" target="_blank">' +
        url +
        '</a>'
      );
    });
  }

  getgroupMessage() {
    //Is_Admin
    this.loading.present();
    this.authservice
      .post('getStaffMessageLastThree', {
        staff_id: this.storage.getjson('teachersDetail')[0]['staff_id'],
        Is_Admin: this.storage.getjson('teachersDetail')[0]['Is_Admin'],
        classid: this.authservice.classids(),
      })
      .subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['status']) {
            this.grpmes = res['senditem'];
            var i = 0;
            for (i = 0; i < this.grpmes.length; i++) {
              this.grpmes[i].Message = this.extractUrl(this.grpmes[i].Message);
            }
            // this.senditems = res['senditem'];
            this.last3days = res['senditem'];
          }
        },
        (err) => {
          this.loading.dismissAll();
        }
      );
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
                  }
                );
              },
              (err) => {
                this.authservice
                  .post('getbase64', { url: encodeURI(url) })
                  .subscribe(
                    (res: any) => {
                      if (res) {
                        this.storeSMSDetails[this.ing].base64 = res['data'];
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
}
