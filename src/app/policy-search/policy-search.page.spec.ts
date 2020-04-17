import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PolicySearchPage } from './policy-search.page';

describe('PolicySearchPage', () => {
  let component: PolicySearchPage;
  let fixture: ComponentFixture<PolicySearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicySearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PolicySearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
