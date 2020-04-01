import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterChoiceMemberUserPage } from './register-choice-member-user.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterChoiceMemberUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterChoiceMemberUserPageRoutingModule {}
