import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeClassComponent } from './fee-class.component';

const routes: Routes = [
  {
    path: '',
    component: FeeClassComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeeClassRoutingModule {}
