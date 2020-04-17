import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAgentListPageRoutingModule } from './user-agent-list-routing.module';

import { UserAgentListPage } from './user-agent-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserAgentListPageRoutingModule
  ],
  declarations: [UserAgentListPage]
})
export class UserAgentListPageModule {}
