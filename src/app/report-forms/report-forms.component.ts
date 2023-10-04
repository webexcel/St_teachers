import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { TranslateConfigService } from '../service/translate-config.service';

@Component({
  selector: 'app-report-forms',
  templateUrl: './report-forms.component.html',
  styleUrls: ['./report-forms.component.scss'],
})
export class ReportFormsComponent implements OnInit {
  name!: string;
  ios: any = false;
  formData = {
    staff_id: 1,
    date: '',
    day: '',
    arrival: '',
    period1: '',
    period2: '',
    period3: '',
    period4: '',
    period5: '',
    period6: '',
    period7: '',
    period8: '',
    period9: '',
    period10: '',
    dispersal: '',
    after_dispersal: '',
    parent_met: '',
    stu_dis_issues: '',
    chronic_late: '',
    chronic_default: '',
  };
  constructor(
    private modalCtrl: ModalController,
    public authservice: AuthService,
    private translate: TranslateConfigService
  ) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.formData, 'confirm');
  }
  ngOnInit() {
    this.ios = this.authservice.isiso();
    this.translate.set();
  }
  submitForm() {
    // Handle form submission here
    console.log(this.formData);
  }
}
