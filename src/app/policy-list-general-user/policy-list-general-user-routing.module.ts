import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolicyListGeneralUserPage } from './policy-list-general-user.page';

const routes: Routes = [
  {
    path: '',
    component: PolicyListGeneralUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyListGeneralUserPageRoutingModule {}
