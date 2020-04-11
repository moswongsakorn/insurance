import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPolicyProtectionGeneralUserPage } from './add-policy-protection-general-user.page';

describe('AddPolicyProtectionGeneralUserPage', () => {
  let component: AddPolicyProtectionGeneralUserPage;
  let fixture: ComponentFixture<AddPolicyProtectionGeneralUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPolicyProtectionGeneralUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPolicyProtectionGeneralUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
