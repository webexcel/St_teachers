import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Base64 } from '@ionic-native/base64/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { FilesService } from '../service/files.service';
import { LoadingService } from '../service/loading.service';
import { StorageService } from '../service/storage.service';
import { TranslateConfigService } from '../service/translate-config.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent implements OnInit {
  ios: any = false;
  @ViewChild('portComponent', { static: false }) portComponent: any;
  @ViewChild('portComponent1', { static: false }) portComponent1: any;
  stafftypes: any = [];
  staffs: any = [];
  select_datas: any = {};
  select_datas1: any = {};
  senditems: any = [];
  grpmes: any = [];
  senditems1: any = [];
  last3days: any = [];
  delete_personalized: any;
  cancel: any;
  send_personalized: any;
  send: any;
  delete: any;
  error: any = false;
  recording: boolean = false;
  fileName!: string;
  audio!: MediaObject;
  Path!: string;
  constructor(
    private serfile: FilesService,
    private media: Media,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    public base64: Base64,
    private sanitizer: DomSanitizer,
    public alertCtrl: AlertController,
    public storage: StorageService,
    private platform: Platform,
    private router: Router,
    private translate: TranslateConfigService,
    public loading: LoadingService,
    public authservice: AuthService
  ) {
    this.platform.backButton.subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  ngOnInit() {
    this.ios = this.authservice.isiso();
    this.translate.set();
    this.translate
      .getparam('delete_personalized')
      .then((v) => (this.delete_personalized = v));
    this.translate.getparam('cancel').then((v) => (this.cancel = v));
    this.translate
      .getparam('send_personalized')
      .then((v) => (this.send_personalized = v));
    this.translate.getparam('send').then((v) => (this.send = v));
    this.translate.getparam('delete').then((v) => (this.delete = v));
    this.select_datas1.s_date = new Date().toISOString();
    this.reset();
    this.getstafftypes();
  }

  reset() {
    this.select_datas.s_date = new Date().toISOString();
    //this.classs = this.storage.getjson('classlist')
    this.select_datas.type = 'STAFFPERSONAL';
    this.select_datas.staff_id =
      this.storage.getjson('teachersDetail')[0]['staff_id'];
    this.select_datas.Is_Admin =
      this.storage.getjson('teachersDetail')[0]['Is_Admin'];
    this.select_datas.image = '';
    this.select_datas.ftype = '';
    this.select_datas.filename = '';
    this.getlist();
  }

  getstafftypes() {
    this.loading.present();
    this.authservice.post('getstafftype', {}).subscribe(
      (res: any) => {
        this.loading.dismissAll();
        if (res['status']) {
          this.stafftypes = res['data'];
        }
      },
      (err) => {
        this.loading.dismissAll();
        console.log(err);
      }
    );
  }

  stafftypesChange(event: any) {
    this.select_datas.student = [];
    this.getStudentsByClass(event.value);
  }

  getStudentsByClass(v: any) {
    if (v.length > 0) {
      let d = '';
      for (let i = 0; i < v.length; i++) {
        if (i != v.length - 1) {
          d = d + `'${v[i]['staffclass']}', `;
        } else {
          d = d + `'${v[i]['staffclass']}'`;
        }
      }
      let data = {
        staff_type: d,
      };
      this.loading.present();
      this.authservice.post('getStaffByClass', data).subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['status']) {
            this.staffs = res['data'];
          }
        },
        (err) => {
          this.loading.dismissAll();
          console.log(err);
        }
      );
    }

    return;
  }
  toggleItems(status: any) {
    if (status) {
      this.portComponent.toggleItems(false);
      this.portComponent.toggleItems(status);
      this.confirm();
    } else {
      this.portComponent.toggleItems(status);
    }
  }

  confirm() {
    this.portComponent.confirm();
    this.portComponent.close();
  }
  toggleItems1(status: any) {
    if (status) {
      this.portComponent1.toggleItems(false);
      this.portComponent1.toggleItems(status);
      this.confirm1();
    } else {
      this.portComponent1.toggleItems(status);
    }
  }

  confirm1() {
    this.portComponent1.confirm();
    this.portComponent1.close();
  }

  getlist() {
    this.loading.present();
    this.authservice
      .post('getstaffpersonalmessagelist', {
        Is_Admin: this.storage.getjson('teachersDetail')[0]['Is_Admin'],
        staff_id: this.storage.getjson('teachersDetail')[0]['staff_id'],
        type: 'PERSONALIZE',
        classid: this.authservice.classids(),
      })
      .subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['status']) {
            this.grpmes = res['data'];
            this.senditems = res['senditem'];
            this.last3days = res['last3senditem'];
          } else {
            this.grpmes = [];
            this.senditems = [];
            this.last3days = [];
          }
        },
        (err) => {
          this.loading.dismissAll();
          console.log(err);
        }
      );
  }

  onSubmit(form: NgForm) {
    if (this.select_datas.staffinfo.length) {
      console.log(this.select_datas);
      this.loading.present();
      this.authservice.post('newstaffpersonalsms', this.select_datas).subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['STATUS']) {
            form.resetForm();
            this.reset();
          }
        },
        (err) => {
          this.loading.dismissAll();
          console.log(err);
        }
      );
    }
  }
  async deletecirculars(ID: any) {
    let alert = await this.alertCtrl.create({
      header: this.delete_personalized,
      //subTitle: this.name,
      //message:message,
      buttons: [
        {
          text: this.cancel,
          role: 'cancel',
          handler: (data) => {
            console.log('Cancel clicked');
          },
        },
        {
          text: this.delete,
          handler: (data) => {
            this.loading.present();
            this.authservice
              .post('getdeletepersonalmessagelist', { ID: ID })
              .subscribe(
                (res) => {
                  this.loading.dismissAll();
                  this.getlist();
                },
                (err) => {
                  this.loading.dismissAll();
                }
              );
          },
        },
      ],
    });
    await alert.present();
  }
  async movegrouptofinal(ID: any) {
    let alert = await this.alertCtrl.create({
      header: this.send_personalized,
      //subTitle: this.name,
      //message:message,
      buttons: [
        {
          text: this.cancel,
          role: 'cancel',
          handler: (data) => {
            console.log('Cancel clicked');
          },
        },
        {
          text: this.send,
          handler: (data) => {
            this.loading.present();
            this.authservice
              .post('movestafftofinal', { ids: ID, msgtype: 'STAFFPERSONAL' })
              .subscribe(
                (res) => {
                  this.loading.dismissAll();
                  this.getlist();
                },
                (err) => {
                  this.loading.dismissAll();
                }
              );
          },
        },
      ],
    });
    await alert.present();
  }

  moveFinalgroupAll() {
    let id = [];
    for (let i = 0; i < this.grpmes.length; i++) {
      id.push({ ID: this.grpmes[i]['ID'] });
    }
    this.movegrouptofinal(id);
  }

  open() {
    this.fileChooser
      .open()
      .then((uri) => {
        console.log(uri);
        this.filePath.resolveNativePath(uri).then(
          (res) => {
            let f: any = res.split('/');
            this.select_datas.filename = f[f.length - 1].toLowerCase();
            let l: any = res.split('.');
            console.log(l);
            l = l[l.length - 1].toLowerCase();
            if (
              l == 'jpg' ||
              l == 'jpeg' ||
              l == 'png' ||
              l == 'pdf' ||
              l == 'mp3' ||
              l == 'xls' ||
              l == 'xlsx'
            ) {
              this.select_datas.ftype = l;
              this.error = false;
              if (l == 'mp3') {
                l = `data:audio/mpeg;base64,`;
              } else {
                l = `data:image/${l};base64,`;
              }
              this.base64.encodeFile(res).then(
                (res) => {
                  this.select_datas.image =
                    this.sanitizer.bypassSecurityTrustUrl(
                      l + res.split('ase64,')[1]
                    );
                },
                (err) => {
                  console.log(err);
                }
              );
            } else {
              this.error = true;
            }
          },
          (err) => {
            console.log(err);
          }
        );
      })
      .catch((e) => console.log(e));
  }

  checkimage(f: any) {
    if (f) {
      f = f.split('.');
      f = f[f.length - 1].toLowerCase();
      console.log(f);
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

  startRecord() {
    this.fileName =
      'record' +
      new Date().getDate() +
      new Date().getMonth() +
      new Date().getFullYear() +
      new Date().getHours() +
      new Date().getMinutes() +
      new Date().getSeconds() +
      '.mp3';

    this.Path = this.serfile.filepath() + this.fileName;
    console.log(this.Path);
    this.audio = this.media.create(this.Path);
    this.select_datas.ftype = '';
    this.select_datas.image = '';
    this.select_datas.filename = '';
    this.audio.startRecord();
    this.recording = true;
  }

  stopRecord() {
    this.audio.stopRecord();
    this.recording = false;

    this.serfile.read(this.fileName).then(
      (res) => {
        console.log(res);
        let l = res.split('base64,');
        if (l[1].length != 0) {
          this.select_datas.ftype = 'mp3';
          this.select_datas.filename = this.fileName;
          this.error = false;
          this.select_datas.image = this.sanitizer.bypassSecurityTrustUrl(
            'data:audio/mpeg;base64,' + l[1]
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deletefile() {
    this.select_datas.ftype = '';
    this.select_datas.image = '';
    this.select_datas.filename = '';
  }

  formatPorts(students: any) {
    return students.map((port: any) => port.name).join(', ');
  }

  formatPorts1(stafftypes: any) {
    return stafftypes.map((port: any) => port.staffclass).join(', ');
  }

  onSubmit1() {
    this.loading.present();
    this.authservice
      .post('searchstaffmessagelist', {
        Is_Admin: this.storage.getjson('teachersDetail')[0]['Is_Admin'],
        s_date: this.select_datas1.s_date,
      })
      .subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['status']) {
            this.senditems1 = res['senditem'];
          } else {
            this.senditems1 = [];
          }
        },
        (err) => {
          this.loading.dismissAll();
          console.log(err);
        }
      );
  }
}
