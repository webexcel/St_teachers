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
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
    canActivate: [loginGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [Guard],
  },
  {
    path: 'circulars',
    loadChildren: () =>
      import('./circulars/circulars.module').then((m) => m.CircularsModule),
    canActivate: [Guard],
  },
  {
    path: 'homework',
    loadChildren: () =>
      import('./homework/homework.module').then((m) => m.HomeworkModule),
    canActivate: [Guard],
  },
  {
    path: 'language',
    loadChildren: () =>
      import('./language/language.module').then((m) => m.LanguageModule),
    canActivate: [Guard],
  },
  {
    path: 'personalized-messages',
    loadChildren: () =>
      import('./personalized/personalized.module').then(
        (m) => m.PersonalizedModule
      ),
    canActivate: [Guard],
  },
  {
    path: 'attendance',
    loadChildren: () =>
      import('./attendance/attendance.module').then((m) => m.AttendanceModule),
    canActivate: [Guard],
  },
  {
    path: 'flash',
    loadChildren: () =>
      import('./flash/flash.module').then((m) => m.FlashModule),
    canActivate: [Guard],
  },

  {
    path: 'report-card',
    loadChildren: () =>
      import('./report-card/report-card.module').then(
        (m) => m.ReportCardModule
      ),
    canActivate: [Guard],
  },
  {
    path: 'staff',
    loadChildren: () =>
      import('./staff/staff.module').then((m) => m.StaffModule),
    canActivate: [Guard],
  },
  {
    path: 'staff-group',
    loadChildren: () =>
      import('./staff-group/staff-group.module').then(
        (m) => m.StaffGroupModule
      ),
    canActivate: [Guard],
  },
  {
    path: 'daily-reports',
    loadChildren: () =>
      import('./daily-reports/daily-reports.module').then(
        (m) => m.DailyReportsModule
      ),
    canActivate: [Guard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
