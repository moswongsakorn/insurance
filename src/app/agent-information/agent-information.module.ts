import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgentInformationPageRoutingModule } from './agent-information-routing.module';

import { AgentInformationPage } from './agent-information.page';
import { PipesModule } from '../pipes/pips.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    AgentInformationPageRoutingModule,
    PipesModule
  ],
  declarations: [AgentInformationPage]
})
export class AgentInformationPageModule {}
