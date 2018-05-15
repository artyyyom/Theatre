import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUnitsEditComponent } from './admin-units-edit.component';

describe('AdminUnitsEditComponent', () => {
  let component: AdminUnitsEditComponent;
  let fixture: ComponentFixture<AdminUnitsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUnitsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUnitsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
