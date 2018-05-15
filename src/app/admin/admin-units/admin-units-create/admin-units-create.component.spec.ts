import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUnitsCreateComponent } from './admin-units-create.component';

describe('AdminUnitsCreateComponent', () => {
  let component: AdminUnitsCreateComponent;
  let fixture: ComponentFixture<AdminUnitsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUnitsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUnitsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
