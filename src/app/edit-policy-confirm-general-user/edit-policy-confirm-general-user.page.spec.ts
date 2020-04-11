import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditPolicyConfirmGeneralUserPage } from './edit-policy-confirm-general-user.page';

describe('EditPolicyConfirmGeneralUserPage', () => {
  let component: EditPolicyConfirmGeneralUserPage;
  let fixture: ComponentFixture<EditPolicyConfirmGeneralUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPolicyConfirmGeneralUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPolicyConfirmGeneralUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
