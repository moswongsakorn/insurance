import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfirmRegisterLeaderMemberUserPage } from './confirm-register-leader-member-user.page';

describe('ConfirmRegisterLeaderMemberUserPage', () => {
  let component: ConfirmRegisterLeaderMemberUserPage;
  let fixture: ComponentFixture<ConfirmRegisterLeaderMemberUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmRegisterLeaderMemberUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmRegisterLeaderMemberUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
