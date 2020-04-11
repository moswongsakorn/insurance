import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalInformationGeneralUserPage } from './personal-information-general-user.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalInformationGeneralUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalInformationGeneralUserPageRoutingModule {}
