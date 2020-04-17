import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserAgentListPage } from './user-agent-list.page';

describe('UserAgentListPage', () => {
  let component: UserAgentListPage;
  let fixture: ComponentFixture<UserAgentListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAgentListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserAgentListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
