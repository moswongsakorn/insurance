import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditAgentInformationPage } from './edit-agent-information.page';

describe('EditAgentInformationPage', () => {
  let component: EditAgentInformationPage;
  let fixture: ComponentFixture<EditAgentInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAgentInformationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditAgentInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
