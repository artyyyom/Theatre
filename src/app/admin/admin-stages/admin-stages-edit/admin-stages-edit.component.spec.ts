import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStagesEditComponent } from './admin-stages-edit.component';

describe('AdminStagesEditComponent', () => {
  let component: AdminStagesEditComponent;
  let fixture: ComponentFixture<AdminStagesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStagesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStagesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
