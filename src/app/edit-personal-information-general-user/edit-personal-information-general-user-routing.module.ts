import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPersonalInformationGeneralUserPage } from './edit-personal-information-general-user.page';

const routes: Routes = [
  {
    path: '',
    component: EditPersonalInformationGeneralUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPersonalInformationGeneralUserPageRoutingModule {}
