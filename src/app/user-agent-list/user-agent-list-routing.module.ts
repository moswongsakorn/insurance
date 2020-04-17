import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAgentListPage } from './user-agent-list.page';

const routes: Routes = [
  {
    path: '',
    component: UserAgentListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAgentListPageRoutingModule {}
