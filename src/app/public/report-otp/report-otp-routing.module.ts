import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportOtpPage } from './report-otp.page';

const routes: Routes = [
  {
    path: '',
    component: ReportOtpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportOtpPageRoutingModule {}
