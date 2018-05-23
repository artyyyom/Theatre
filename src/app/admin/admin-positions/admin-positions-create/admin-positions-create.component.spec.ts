import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPositionsCreateComponent } from './admin-positions-create.component';

describe('AdminPositionsCreateComponent', () => {
  let component: AdminPositionsCreateComponent;
  let fixture: ComponentFixture<AdminPositionsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPositionsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPositionsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
