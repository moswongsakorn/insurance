import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolicyDetailPageRoutingModule } from './policy-detail-routing.module';

import { PolicyDetailPage } from './policy-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PolicyDetailPageRoutingModule
  ],
  declarations: [PolicyDetailPage]
})
export class PolicyDetailPageModule {}
