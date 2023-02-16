import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopAproveComponent } from './workshop-aprove.component';

describe('WorkshopAproveComponent', () => {
  let component: WorkshopAproveComponent;
  let fixture: ComponentFixture<WorkshopAproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopAproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopAproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
