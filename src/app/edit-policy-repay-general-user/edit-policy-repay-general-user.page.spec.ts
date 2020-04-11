import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditPolicyRepayGeneralUserPage } from './edit-policy-repay-general-user.page';

describe('EditPolicyRepayGeneralUserPage', () => {
  let component: EditPolicyRepayGeneralUserPage;
  let fixture: ComponentFixture<EditPolicyRepayGeneralUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPolicyRepayGeneralUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPolicyRepayGeneralUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
