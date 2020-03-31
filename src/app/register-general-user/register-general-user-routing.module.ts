import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterGeneralUserPage } from './register-general-user.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterGeneralUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterGeneralUserPageRoutingModule {}
