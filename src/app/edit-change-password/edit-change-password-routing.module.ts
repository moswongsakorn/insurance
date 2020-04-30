import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditChangePasswordPage } from './edit-change-password.page';

const routes: Routes = [
  {
    path: '',
    component: EditChangePasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditChangePasswordPageRoutingModule {}
