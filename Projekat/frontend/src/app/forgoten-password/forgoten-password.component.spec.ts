import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotenPasswordComponent } from './forgoten-password.component';

describe('ForgotenPasswordComponent', () => {
  let component: ForgotenPasswordComponent;
  let fixture: ComponentFixture<ForgotenPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotenPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotenPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
