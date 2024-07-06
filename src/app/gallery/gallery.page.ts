import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Base64 } from '@ionic-native/base64/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ModalController, ToastController } from '@ionic/angular';
import Swiper from 'swiper';
import { SelectModalComponent } from '../select-modal/select-modal.component';
import { AuthService } from '../service/auth.service';
import { LoadingService } from '../service/loading.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  openCat: boolean = false; classList = [{ id: 1, name: "All Classes" }]; classId: any; ClassName: any;
  categoryName: any; descText: any; CatName: any; galleryDetails: any[] = []; categoryList: any[] = [];
  catId: any; fileName: any[] = []; fileType: any[] = []; fileBase64: any[] = [];
  ViewDetails: any[] = []; currentViewCatId: any; deleteButton: boolean = false; currentViewCatIndex: any;
  presentView: any; viewImages: boolean = false;

  @ViewChild('swiper') swiperRef: ElementRef | undefined; swiper?: Swiper;

  constructor(public authservice: AuthService, private modalCtrl: ModalController, private fileChooser: FileChooser,
    private filePath: FilePath, public base64: Base64, public loading: LoadingService, private toastController: ToastController,
    private storage: StorageService) { }

  ngOnInit() {
    this.galleryDetails = [];
    this.presentView = "main-page";
    this.galleryList();
  }

  ionViewWillEnter() {
    this.resetCatModal();
  }

  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'middle'
    });
    toast.present();
  }

  getCategory() {
    this.authservice.get('getcategory').subscribe(
      (res: any) => {
        if (res['status']) {
          this.categoryList = res["data"];
          this.openOptions(this.categoryList, this.catId, false, 'cat', ['CatID', 'CatName'])
        }
      },
      (err) => {
      }
    );
  }

  resetForm() {
    this.fileName = [];
    this.fileType = [];
    this.fileBase64 = [];
    this.CatName = "No Event Selected";
    this.catId = "";
  }

  resetCatModal() {
    this.classId = 1;
    this.ClassName = "All Classes";
    this.categoryName = "";
    this.descText = "";
    this.CatName = "No Event Selected";
    this.catId = "";
  }

  galleryList() {
    this.loading.present();
    this.authservice
      .get('getGalleryList')
      .subscribe(
        (res: any) => {
          this.galleryDetails = res["data"];
          this.loading.dismissAll();
        },
        (err) => {
          this.loading.dismissAll();
        });
  }

  openCatOption() {
    this.getCategory();
  }

  async openOptions(data: any, value: any, multi = false, type: any, parameters = ['id', 'name']) {
    const modal = await this.modalCtrl.create({
      component: SelectModalComponent,
      componentProps: {
        optionsList: data,
        value: value,
        multi: multi,
        parameters: parameters,
      },
    });

    modal.onDidDismiss().then((result: any) => {
      if (type == "class") {
        this.classId = result.data.id;
        this.ClassName =
          result.data.name != undefined && result.data.id != 0
            ? result.data.name
            : 'No Classes Selected';
      } else if (type == "cat") {
        this.catId = result.data.CatID;
        this.CatName =
          result.data.CatName != undefined && result.data.CatName != 0
            ? result.data.CatName
            : 'No Event Selected';
      }

    });
    return await modal.present();
  }

  openCatagoryModal() {
    this.openCat = true;
  }

  saveCat() {
    if (this.categoryName == undefined || this.categoryName == "") {
      this.showToast("Event Name is Empty!", "danger");
    } else if (this.descText == undefined || this.descText == "") {
      this.showToast("Event Description is Empty!", "danger");
    } else {
      this.loading.present();
      this.authservice
        .post('saveCategory', { catTitle: this.categoryName, Discrip: this.descText, Is_Admin: this.storage.getjson('teachersDetail')[0]['Is_Admin'] })
        .subscribe(
          (res: any) => {
            if (res["status"]) {
              this.openCat = false;
              this.resetCatModal();
              this.showToast("Event Added Successfully.", "success");
              this.loading.dismissAll();
            }
          },
          (err) => {
            this.loading.dismissAll();
          });
    }
  }

  onWillDismiss(evt: any) {
    this.openCat = false;
    this.presentView = "main-page";
    this.currentViewCatId = "";
  }

  closeCat() {
    this.openCat = false;
    this.presentView = "main-page";
    this.currentViewCatId = "";
    this.deleteButton = false;
    this.modalCtrl.dismiss();
  }

  addGallery() {
    if (this.catId == undefined || this.catId == "") {
      this.showToast("No Event Selected", "danger");
    } else if (this.fileName == undefined || this.fileName.length == 0) {
      this.showToast("No Attachments Selected", "danger");
    } else {
      this.loading.present();
      let data = {
        CatID: this.catId,
        Is_Admin: this.storage.getjson("teachersDetail")[0]["Is_Admin"],
        type: this.fileType,
        fileNames: this.fileName,
        fileBase: this.fileBase64
      }
      this.authservice
        .post('saveGallery', data)
        .subscribe(
          (res: any) => {
            if (res["status"]) {
              this.loading.dismissAll();
              this.showToast("Gallery Added Successfully.", "success");
              this.galleryList();
              this.resetForm();
            }
          },
          (err) => {
            this.loading.dismissAll();
          });
    }
  }

  open() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept =
      'image/*, application/pdf, .doc, .docx, .txt, .xls, .xlsx, .mp3, .mp4';
    fileInput.multiple = true;

    fileInput.onchange = (event: any) => {
      this.fileName = [];
      this.fileType = [];
      this.fileBase64 = [];
      let data = event.target.files;
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          const file = data[i];
          if (file) {
            this.readFile(file);
          }
        }
      }
    };

    fileInput.click();
  }

  readFile(file: File) {
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      this.fileName.push(file.name);
      this.fileType.push(file.name.split('.').pop());
      this.fileBase64.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  viewCatDetails(index: any) {
    if (this.galleryDetails[index].CatID != undefined) {
      this.loading.present();
      this.authservice
        .post('getViewGalleryList', { CatID: this.galleryDetails[index].CatID })
        .subscribe(
          (res: any) => {
            if (res["status"]) {
              this.presentView = "view-page";
              this.currentViewCatId = this.galleryDetails[index].CatID;
              this.currentViewCatIndex = index;
              this.ViewDetails = res["data"];
              this.ViewDetails.forEach(element => {
                element["checked"] = false;
                let dataGal = element.GalPath.split("/");
                element["thumbImg"] = res["thumburl"] != undefined ? res["thumburl"] + dataGal[dataGal.length - 1] : dataGal[dataGal.length - 1];
              });
              this.loading.dismissAll();
            }
          },
          (err) => {
            this.loading.dismissAll();
          });
    }
  }

  deleteCatDetails(index: any) {
    if (this.galleryDetails[index].CatID != undefined) {
      this.authservice
        .post('getdeleteGallery', { CatID: this.galleryDetails[index].CatID })
        .subscribe(
          (res: any) => {
            if (res["STATUS"]) {
              this.showToast("Gallery Deleted Successfully.", "success");
              this.galleryList();
            }
          });
    }
  }

  deleteAll() {
    if (this.currentViewCatId != "") {
      this.loading.present();
      this.authservice
        .post('getdeleteGallery', { CatID: this.currentViewCatId })
        .subscribe(
          (res: any) => {
            if (res["status"]) {
              this.loading.dismissAll();
              this.showToast("All Images Deleted Successfully.", "success");
              this.presentView = "main-page";
              this.currentViewCatId = "";
              this.modalCtrl.dismiss();
              this.galleryList();
            }
          },
          (err) => {
            this.loading.dismissAll();
          });

    }
  }

  deleteImg() {
    if (this.ViewDetails.length > 0) {
      let dataIds = [];
      for (let i = 0; i < this.ViewDetails.length; i++) {
        if (this.ViewDetails[i].checked) {
          dataIds.push(this.ViewDetails[i].GalID);
        }
      }
      this.authservice
        .post('getdeleteGalleryList', { GalId: dataIds, Is_Admin: this.storage.getjson("teachersDetail")[0]["Is_Admin"] })
        .subscribe(
          (res: any) => {
            if (res["status"]) {
              this.showToast("Image Deleted Successfully.", "success");
              this.viewCatDetails(this.currentViewCatIndex);
              if (this.ViewDetails.length == dataIds.length) {
                this.presentView = "main-page";
                this.modalCtrl.dismiss();
                this.galleryList();
              }
            }
          });
    }
  }

  checkCardSelection(index: any) {
    for (let i = 0; i < this.ViewDetails.length; i++) {
      if (this.ViewDetails[i].checked) {
        this.deleteButton = true;
        break;
      } else {
        this.deleteButton = false;
      }
    }
  }

  openImage(data: any) {
    this.viewImages = true;
  }

  closeImageModal() {
    this.viewImages = false;
    this.presentView = "view-page";
    this.modalCtrl.dismiss();
  }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  swiperSlideChanged(e: any) { }

  goNext() {
    this.swiper?.slideNext();
  }

  goPrev() {
    this.swiper?.slidePrev();
  }
}
