import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgentInformationPage } from './agent-information.page';

const routes: Routes = [
  {
    path: '',
    component: AgentInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentInformationPageRoutingModule {}
