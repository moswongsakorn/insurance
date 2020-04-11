import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditPersonalInformationGeneralUserPage } from './edit-personal-information-general-user.page';

describe('EditPersonalInformationGeneralUserPage', () => {
  let component: EditPersonalInformationGeneralUserPage;
  let fixture: ComponentFixture<EditPersonalInformationGeneralUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPersonalInformationGeneralUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPersonalInformationGeneralUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
