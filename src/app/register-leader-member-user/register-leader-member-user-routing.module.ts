import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterLeaderMemberUserPage } from './register-leader-member-user.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterLeaderMemberUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterLeaderMemberUserPageRoutingModule {}
