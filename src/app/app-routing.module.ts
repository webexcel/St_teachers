import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Guard, loginGuard } from './_guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
    canActivate: [loginGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [Guard],
  },
  {
    path: 'circulars',
    loadChildren: () => import('./circulars/circulars.module').then((m) => m.CircularsModule),
    canActivate: [Guard],
  },
  {
    path: 'homework',
    loadChildren: () => import('./homework/homework.module').then((m) => m.HomeworkModule),
    canActivate: [Guard],
  },
  {
    path: 'language',
    loadChildren: () => import('./language/language.module').then((m) => m.LanguageModule),
    canActivate: [Guard],
  },
  {
    path: 'personalized-messages',
    loadChildren: () => import('./personalized/personalized.module').then((m) => m.PersonalizedModule),
    canActivate: [Guard],
  },
  {
    path: 'attendance',
    loadChildren: () => import('./attendance/attendance.module').then((m) => m.AttendanceModule),
    canActivate: [Guard],
  },
  {
    path: 'flash',
    loadChildren: () => import('./flash/flash.module').then((m) => m.FlashModule),
    canActivate: [Guard],
  },

  {
    path: 'report-card',
    loadChildren: () => import('./report-card/report-card.module').then((m) => m.ReportCardModule),
    canActivate: [Guard],
  },
  {
    path: 'staff',
    loadChildren: () => import('./staff/staff.module').then((m) => m.StaffModule),
    canActivate: [Guard],
  },
  {
    path: 'staff-group',
    loadChildren: () => import('./staff-group/staff-group.module').then((m) => m.StaffGroupModule),
    canActivate: [Guard],
  },
  {
    path: 'timetable',
    loadChildren: () => import('./timetable/timetable.module').then((m) => m.TimetableModule),
    canActivate: [Guard],
  },
  {
    path: 'daily-reports',
    loadChildren: () => import('./daily-reports/daily-reports.module').then((m) => m.DailyReportsModule),
    canActivate: [Guard],
  },

  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then((m) => m.MessagesModule),
    canActivate: [Guard],
  },

  {
    path: 'reports',
    loadChildren: () => import('./add-remarks/reports.module').then((m) => m.ReportsModule),
    canActivate: [Guard],
  },

  {
    path: 'view-remarks',
    loadChildren: () => import('./view-remarks/view-remarks.module').then((m) => m.ViewRemarksModule),
    canActivate: [Guard],
  },

  {
    path: 'exam-schedule',
    loadChildren: () => import('./exam-schedule/exam-schedule.module').then((m) => m.ExamScheduleModule),
    canActivate: [Guard],
  },

  {
    path: 'fee-report',
    loadChildren: () => import('./fee-report/fee-report.module').then((m) => m.FeeReportModule),
    canActivate: [Guard],
  },

  {
    path: 'fee-report/fee-class/:classId',
    loadChildren: () => import('./fee-report/fee-class/fee-class.module').then((m) => m.FeeClassModule),
    canActivate: [Guard],
  },

  {
    path: 'fee-report/fee-student/:classId/:studentId',
    loadChildren: () => import('./fee-report/fee-student/fee-student.module').then((m) => m.FeeStudentModule),
    canActivate: [Guard],
  },

  {
    path: 'uploads',
    loadChildren: () => import('./uploads/uploads.module').then((m) => m.UploadsPageModule),
    canActivate: [Guard],
  },

  {
    path: 'class-student-fee-report',
    loadChildren: () => import('./class-student-fee-report/class-student-fee-report.module').then(m => m.ClassStudentFeeReportPageModule),
    canActivate: [Guard],
  },

  {
    path: 'class-student-fee-report/fee-class/:classId',
    loadChildren: () => import('./class-student-fee-report/fee-class/fee-class.module').then((m) => m.FeeClassModule),
    canActivate: [Guard],
  },

  {
    path: 'class-student-fee-report/fee-student/:classId/:studentId',
    loadChildren: () => import('./class-student-fee-report/fee-student/fee-student.module').then((m) => m.FeeStudentModule),
    canActivate: [Guard],
  },
  {
    path: 'expences',
    loadChildren: () => import('./expences/expences.module').then(m => m.ExpencesPageModule),
    canActivate: [Guard],
  },
  {
    path: 'absentees',
    loadChildren: () => import('./absentees/absentees.module').then(m => m.AbsenteesPageModule),
    canActivate: [Guard],
  },  {
    path: 'staff-free-period',
    loadChildren: () => import('./staff-free-period/staff-free-period.module').then( m => m.StaffFreePeriodPageModule)
  },
  {
    path: 'teachers-report',
    loadChildren: () => import('./teachers-report/teachers-report.module').then( m => m.TeachersReportPageModule)
  },
  {
    path: 'mark-enter',
    loadChildren: () => import('./mark-enter/mark-enter.module').then( m => m.MarkEnterPageModule)
  },
  {
    path: 'gallery',
    loadChildren: () => import('./gallery/gallery.module').then( m => m.GalleryPageModule)
  },
  {
    path: 'remarks',
    loadChildren: () => import('./remarks/remarks.module').then( m => m.RemarksPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
