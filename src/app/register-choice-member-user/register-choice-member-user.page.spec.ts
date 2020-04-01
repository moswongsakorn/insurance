import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterChoiceMemberUserPage } from './register-choice-member-user.page';

describe('RegisterChoiceMemberUserPage', () => {
  let component: RegisterChoiceMemberUserPage;
  let fixture: ComponentFixture<RegisterChoiceMemberUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterChoiceMemberUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterChoiceMemberUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
