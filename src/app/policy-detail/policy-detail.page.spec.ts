import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PolicyDetailPage } from './policy-detail.page';

describe('PolicyDetailPage', () => {
  let component: PolicyDetailPage;
  let fixture: ComponentFixture<PolicyDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
