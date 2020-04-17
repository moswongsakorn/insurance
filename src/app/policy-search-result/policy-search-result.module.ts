import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolicySearchResultPageRoutingModule } from './policy-search-result-routing.module';

import { PolicySearchResultPage } from './policy-search-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PolicySearchResultPageRoutingModule
  ],
  declarations: [PolicySearchResultPage]
})
export class PolicySearchResultPageModule {}
