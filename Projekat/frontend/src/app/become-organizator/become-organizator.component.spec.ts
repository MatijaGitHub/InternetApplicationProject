import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeOrganizatorComponent } from './become-organizator.component';

describe('BecomeOrganizatorComponent', () => {
  let component: BecomeOrganizatorComponent;
  let fixture: ComponentFixture<BecomeOrganizatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BecomeOrganizatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BecomeOrganizatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
