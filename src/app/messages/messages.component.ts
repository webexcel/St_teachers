import { Component, OnInit } from '@angular/core';
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
  storeSMSDetails: any = [];
  teachersDetail: any = this.storage.getjson('teachersDetail');

  constructor(
    public storage: StorageService,
    public authservice: AuthService,
    public loading: LoadingService,
    private serfile: FilesService
  ) {}

  ngOnInit() {}

  getfilename(f: any) {
    f = f.split('/');
    f = f[f.length - 1];
    return f;
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
    console.log(this.storeSMSDetails, 'aaaaaaaaaa');
  }
}
