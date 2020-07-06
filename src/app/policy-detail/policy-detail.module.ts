import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolicyDetailPageRoutingModule } from './policy-detail-routing.module';

import { PolicyDetailPage } from './policy-detail.page';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../pipes/pips.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    PolicyDetailPageRoutingModule,
    PipesModule
  ],
  declarations: [PolicyDetailPage]
})
export class PolicyDetailPageModule {}
