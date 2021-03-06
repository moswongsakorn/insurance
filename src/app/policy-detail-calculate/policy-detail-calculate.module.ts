import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolicyDetailCalculatePageRoutingModule } from './policy-detail-calculate-routing.module';

import { PolicyDetailCalculatePage } from './policy-detail-calculate.page';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../pipes/pips.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    PolicyDetailCalculatePageRoutingModule,
    PipesModule
  ],
  declarations: [PolicyDetailCalculatePage]
})
export class PolicyDetailCalculatePageModule {}
