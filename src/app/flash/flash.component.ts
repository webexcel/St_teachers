import { Component, OnInit, ViewChild } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
// import { IonicSelectableComponent } from 'ionic-selectable';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Base64 } from '@ionic-native/base64/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { AlertController, IonModal, Platform } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AuthService } from '../service/auth.service';
import { LoadingService } from '../service/loading.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.scss'],
})
export class FlashComponent implements OnInit {
  ios: any = false;
  @ViewChild('portComponent', { static: false }) portComponent: any;
  classs: any = [];
  details: any = {};
  error: any = false;
  flashlist: any = [];
  showDatePicker: boolean = false;
  @ViewChild(IonModal)
  modal!: IonModal;
  isPickerOpen: boolean = false;
  fileAttached: boolean = false;

  constructor(
    public alertCtrl: AlertController,
    private sanitizer: DomSanitizer,
    private filePath: FilePath,
    public base64: Base64,
    public loading: LoadingService,
    public authservice: AuthService,
    public storage: StorageService,
    private platform: Platform,
    private router: Router,
    private fileChooser: FileChooser
  ) {
    this.platform.backButton.subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  ngOnInit() {
    this.ios = this.authservice.isiso();
    this.classs = this.storage.getjson('classlist');
    this.details.staff_code =
      this.storage.getjson('teachersDetail')[0]['staff_id'];
    this.details.enddate = new Date().toISOString();
    this.details.startdate = new Date().toISOString();
    this.details.image = '';
    this.details.type = '';
    this.flashmessage();
    // this.reset();
  }

  // reset() {
  //   this.details;
  // }

  flashmessage() {
    let flashmes;

    this.loading.present();
    this.authservice.post('getflashmessage', {}).subscribe(
      (result: any) => {
        this.loading.dismissAll();
        flashmes = result;
        if (flashmes.status) {
          this.flashlist = flashmes.data;
          var i = 0;
          for (i = 0; i < this.flashlist.length; i++) {
            this.flashlist[i].Discription = this.authservice.extractUrl(
              this.flashlist[i].Discription
            );
          }
        }
      },
      (err) => {
        this.loading.dismissAll();
      }
    );
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

  open() {
    this.fileChooser
      .open()
      .then((uri) => {
        this.filePath.resolveNativePath(uri).then(
          (res) => {
            let l: any = res.split('.');
            l = l[l.length - 1].toLowerCase();
            if (l == 'jpg' || l == 'jpeg' || l == 'png') {
              this.details.type = l;
              this.error = false;
              l = `data:image/${l};base64,`;
              this.base64.encodeFile(res).then(
                (res) => {
                  this.details.image = this.sanitizer.bypassSecurityTrustUrl(
                    l + res.split('ase64,')[1]
                  );
                },
                (err) => {}
              );
            } else {
              this.error = true;
            }
          },
          (err) => {}
        );
      })
      .catch((e) => console.log(e));
  }

  onSubmit() {
    this.loading.present();
    this.authservice.post('saveflase', this.details).subscribe(
      (res: any) => {
        this.loading.dismissAll();
        if (res['status']) {
          this.flashmessage();
          this.show('Flash saved  Successfully');
          this.reset();
        }
      },
      (err) => {
        this.loading.dismissAll();
      }
    );
  }

  reset() {
    this.details.title = ''; // Reset title field
    this.details.description = ''; // Reset description field
    this.details.startdate = new Date().toISOString(); // Reset start date
    this.details.enddate = new Date().toISOString(); // Reset end date
    this.details.image = ''; // Reset image field
    this.details.type = ''; // Reset type field
    this.error = false; // Reset error status
  }

  delete(id: any) {
    this.loading.present();
    this.authservice.post('deleteflase', { nid: id }).subscribe(
      (res: any) => {
        this.loading.dismissAll();
        if (res['status']) {
          this.flashmessage();
          this.show('Flash deleted  Successfully');
        }
      },
      (err) => {
        this.loading.dismissAll();
      }
    );
  }

  deletefile() {
    this.details.image = '';
    this.details.type = '';
  }

  async show(msg: any) {
    let alert = await this.alertCtrl.create({
      header: msg,
      buttons: [
        {
          text: 'Ok',
          role: 'Ok',
        },
      ],
    });
    await alert.present();
  }
  showHideDatePicker() {
    this.showDatePicker = !this.showDatePicker;
  }

  formatDate(date: Date = new Date()) {
    const today = new Date(date);
    const yyyy = today.getFullYear();
    let mm = `${today.getMonth() + 1}`; // Months start at 0!
    let dd = `${today.getDate()}`;

    if (+dd < 10) {
      dd = '0' + dd;
    }
    if (+mm < 10) {
      mm = '0' + mm;
    }

    return dd + '/' + mm + '/' + yyyy;
  }

  cancel_date() {
    this.modal.dismiss(null, 'confirm');
  }

  confirm_date() {
    this.modal.dismiss(null, 'confirm');
  }

  toggleDateSelection() {
    this.isPickerOpen = !this.isPickerOpen;
  }
  onWillDismiss(event: Event, type: any) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'cancel') {
      if (type == 'first') {
        this.details.startdate = null;
      } else {
        this.details.enddate = null;
      }
    }
  }
}
