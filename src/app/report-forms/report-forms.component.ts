import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { LoadingService } from '../service/loading.service';
import { TranslateConfigService } from '../service/translate-config.service';

@Component({
  selector: 'app-report-forms',
  templateUrl: './report-forms.component.html',
  styleUrls: ['./report-forms.component.scss'],
})
export class ReportFormsComponent implements OnInit {
  @Input() type: any;
  @Input() data: any;
  @Input() level: any;
  name!: string;
  ios: any = false;
  formData = {
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
  submitStatus: any = false;
  topFormData = {
    date: '',
    day: '',
    arrival: '',
    teachers_on_leave: '',
    mrng_break_obs: '',
    teachers_pos_obs: '',
    teachers_obs_improved_fixed: '',
    cls_obs_rpt: '',
    notbook_chk_rpt: '',
    bookback_exercise_diary_chk_rpt: '',
    stu_discipline_issue: '',
    lunch_brk_rpt: '',
    prgrm_rltd_wks_dn: '',
    transport_dis_rpt: '',
    dispersal: '',
    eca_rpt: '',
    general_rpt: '',
    parent_complaint: '',
    parent_met: '',
    teachers_issue_handled: '',
    next_day_plan: '',
    other_works: '',
  };
  formGroupTop: FormGroup;
  formGroup: FormGroup;

  enable: any;
  constructor(
    public loading: LoadingService,
    private modalCtrl: ModalController,
    public authservice: AuthService,
    private translate: TranslateConfigService,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      date: ['', Validators.required],
      day: ['', Validators.required],
      arrival: ['', Validators.required],
      period1: ['', Validators.required],
      period2: ['', Validators.required],
      period3: ['', Validators.required],
      period4: ['', Validators.required],
      period5: ['', Validators.required],
      period6: ['', Validators.required],
      period7: ['', Validators.required],
      period8: ['', Validators.required],
      period9: ['', Validators.required],
      period10: ['', Validators.required],
      dispersal: ['', Validators.required],
      after_dispersal: ['', Validators.required],
      parent_met: ['', Validators.required],
      stu_dis_issues: ['', Validators.required],
      chronic_late: ['', Validators.required],
      chronic_default: ['', Validators.required],
    });
    this.formGroupTop = this.formBuilder.group({
      date: ['', Validators.required],
      day: ['', Validators.required],
      arrival: ['', Validators.required],
      teachers_on_leave: ['', Validators.required],
      mrng_break_obs: ['', Validators.required],
      teachers_pos_obs: ['', Validators.required],
      teachers_obs_improved_fixed: ['', Validators.required],
      cls_obs_rpt: ['', Validators.required],
      notbook_chk_rpt: ['', Validators.required],
      bookback_exercise_diary_chk_rpt: ['', Validators.required],
      stu_discipline_issue: ['', Validators.required],
      lunch_brk_rpt: ['', Validators.required],
      prgrm_rltd_wks_dn: ['', Validators.required],
      transport_dis_rpt: [
        this.topFormData.transport_dis_rpt,
        Validators.required,
      ],
      dispersal: ['', Validators.required],
      eca_rpt: ['', Validators.required],
      general_rpt: ['', Validators.required],
      parent_complaint: ['', Validators.required],
      parent_met: ['', Validators.required],
      teachers_issue_handled: ['', Validators.required],
      next_day_plan: ['', Validators.required],
      other_works: ['', Validators.required],
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.submitStatus = true;
    if (this.level == 3) {
      return this.modalCtrl.dismiss(this.formGroupTop, 'confirm');
    } else {
      return this.modalCtrl.dismiss(this.formGroup, 'confirm');
    }
  }
  ngOnInit() {
    this.ios = this.authservice.isiso();
    this.translate.set();
    if (this.type == 'edit' && this.level == 3) {
      this.formGroupTop.setValue({
        date: this.data.date,
        day: this.data.day,
        arrival: this.data.arrival,
        teachers_on_leave: this.data.teachers_on_leave,
        mrng_break_obs: this.data.mrng_break_obs,
        teachers_pos_obs: this.data.teachers_pos_obs,
        teachers_obs_improved_fixed: this.data.teachers_obs_improved_fixed,
        cls_obs_rpt: this.data.cls_obs_rpt,
        notbook_chk_rpt: this.data.notbook_chk_rpt,
        bookback_exercise_diary_chk_rpt:
          this.data.bookback_exercise_diary_chk_rpt,
        stu_discipline_issue: this.data.stu_discipline_issue,
        lunch_brk_rpt: this.data.lunch_brk_rpt,
        prgrm_rltd_wks_dn: this.data.prgrm_rltd_wks_dn,
        transport_dis_rpt: this.data.transport_dis_rpt,
        dispersal: this.data.dispersal,
        eca_rpt: this.data.eca_rpt,
        general_rpt: this.data.general_rpt,
        parent_complaint: this.data.parent_complaint,
        parent_met: this.data.parent_met,
        teachers_issue_handled: this.data.teachers_issue_handled,
        next_day_plan: this.data.next_day_plan,
        other_works: this.data.other_works,

        // ... provide values for other controls
      });
      // this.formGroupTop.value = this.data;
    }
    if (this.type == 'edit' && this.level == 4) {
      // this.formGroup.value = this.data;

      this.formGroup.setValue({
        date: this.data.date,
        day: this.data.day,
        arrival: this.data.arrival,
        period1: this.data.period1,
        period2: this.data.period2,
        period3: this.data.period3,
        period4: this.data.period4,
        period5: this.data.period5,
        period6: this.data.period6,
        period7: this.data.period7,
        period8: this.data.period8,
        period9: this.data.period9,
        period10: this.data.period10,
        dispersal: this.data.dispersal,
        after_dispersal: this.data.after_dispersal,
        parent_met: this.data.parent_met,
        stu_dis_issues: this.data.stu_dis_issues,
        chronic_late: this.data.chronic_late,
        chronic_default: this.data.chronic_default,

        // ... provide values for other controls
      });
    }
  }
  submitForm() {
    // Handle form submission here
    console.log(this.formData);
  }
}
