import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterLeaderMemberUserPage } from './register-leader-member-user.page';

describe('RegisterLeaderMemberUserPage', () => {
  let component: RegisterLeaderMemberUserPage;
  let fixture: ComponentFixture<RegisterLeaderMemberUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterLeaderMemberUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterLeaderMemberUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
