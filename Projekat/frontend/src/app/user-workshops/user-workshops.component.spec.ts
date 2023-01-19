import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWorkshopsComponent } from './user-workshops.component';

describe('UserWorkshopsComponent', () => {
  let component: UserWorkshopsComponent;
  let fixture: ComponentFixture<UserWorkshopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserWorkshopsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserWorkshopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
