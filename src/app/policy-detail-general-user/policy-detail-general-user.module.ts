import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolicyDetailGeneralUserPageRoutingModule } from './policy-detail-general-user-routing.module';

import { PolicyDetailGeneralUserPage } from './policy-detail-general-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PolicyDetailGeneralUserPageRoutingModule
  ],
  declarations: [PolicyDetailGeneralUserPage]
})
export class PolicyDetailGeneralUserPageModule {}
