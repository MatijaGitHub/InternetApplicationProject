import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopMessagesComponent } from './workshop-messages.component';

describe('WorkshopMessagesComponent', () => {
  let component: WorkshopMessagesComponent;
  let fixture: ComponentFixture<WorkshopMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopMessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
