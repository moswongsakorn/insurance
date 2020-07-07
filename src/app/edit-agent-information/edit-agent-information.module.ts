import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAgentInformationPageRoutingModule } from './edit-agent-information-routing.module';

import { EditAgentInformationPage } from './edit-agent-information.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),

    EditAgentInformationPageRoutingModule
  ],
  declarations: [EditAgentInformationPage]
})
export class EditAgentInformationPageModule {}
