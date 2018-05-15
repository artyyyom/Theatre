import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStagesCreateComponent } from './admin-stages-create.component';

describe('AdminStagesCreateComponent', () => {
  let component: AdminStagesCreateComponent;
  let fixture: ComponentFixture<AdminStagesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStagesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStagesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
