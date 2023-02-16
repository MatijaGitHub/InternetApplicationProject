import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertNewUserComponent } from './insert-new-user.component';

describe('InsertNewUserComponent', () => {
  let component: InsertNewUserComponent;
  let fixture: ComponentFixture<InsertNewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertNewUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
