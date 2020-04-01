import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfirmRegisterAgentMemberUserPage } from './confirm-register-agent-member-user.page';

describe('ConfirmRegisterAgentMemberUserPage', () => {
  let component: ConfirmRegisterAgentMemberUserPage;
  let fixture: ComponentFixture<ConfirmRegisterAgentMemberUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmRegisterAgentMemberUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmRegisterAgentMemberUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
