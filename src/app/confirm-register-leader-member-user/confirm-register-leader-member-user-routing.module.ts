import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmRegisterLeaderMemberUserPage } from './confirm-register-leader-member-user.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmRegisterLeaderMemberUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmRegisterLeaderMemberUserPageRoutingModule {}
