import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditPolicyProtectionGeneralUserPage } from './edit-policy-protection-general-user.page';

describe('EditPolicyProtectionGeneralUserPage', () => {
  let component: EditPolicyProtectionGeneralUserPage;
  let fixture: ComponentFixture<EditPolicyProtectionGeneralUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPolicyProtectionGeneralUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPolicyProtectionGeneralUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
