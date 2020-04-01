import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmRegisterGeneralUserPage } from './confirm-register-general-user.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmRegisterGeneralUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmRegisterGeneralUserPageRoutingModule {}
