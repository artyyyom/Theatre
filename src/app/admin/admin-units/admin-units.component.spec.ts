import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUnitsComponent } from './admin-units.component';

describe('AdminUnitsComponent', () => {
  let component: AdminUnitsComponent;
  let fixture: ComponentFixture<AdminUnitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUnitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
