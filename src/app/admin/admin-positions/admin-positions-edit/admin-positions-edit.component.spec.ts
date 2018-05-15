import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPositionsEditComponent } from './admin-positions-edit.component';

describe('AdminPositionsEditComponent', () => {
  let component: AdminPositionsEditComponent;
  let fixture: ComponentFixture<AdminPositionsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPositionsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPositionsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
