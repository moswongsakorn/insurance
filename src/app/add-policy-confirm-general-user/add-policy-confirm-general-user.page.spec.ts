import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPolicyConfirmGeneralUserPage } from './add-policy-confirm-general-user.page';

describe('AddPolicyConfirmGeneralUserPage', () => {
  let component: AddPolicyConfirmGeneralUserPage;
  let fixture: ComponentFixture<AddPolicyConfirmGeneralUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPolicyConfirmGeneralUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPolicyConfirmGeneralUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
