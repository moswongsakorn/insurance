import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgentInformationPage } from './agent-information.page';

describe('AgentInformationPage', () => {
  let component: AgentInformationPage;
  let fixture: ComponentFixture<AgentInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentInformationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgentInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
