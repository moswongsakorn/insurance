import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditChangePasswordPage } from './edit-change-password.page';

describe('EditChangePasswordPage', () => {
  let component: EditChangePasswordPage;
  let fixture: ComponentFixture<EditChangePasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditChangePasswordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditChangePasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
