import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterAgentMemberUserPage } from './register-agent-member-user.page';

describe('RegisterAgentMemberUserPage', () => {
  let component: RegisterAgentMemberUserPage;
  let fixture: ComponentFixture<RegisterAgentMemberUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAgentMemberUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterAgentMemberUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
