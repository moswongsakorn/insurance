import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditPolicyGeneralUserPage } from './edit-policy-general-user.page';

describe('EditPolicyGeneralUserPage', () => {
  let component: EditPolicyGeneralUserPage;
  let fixture: ComponentFixture<EditPolicyGeneralUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPolicyGeneralUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPolicyGeneralUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
