import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSeancesCreateComponent } from './admin-seances-create.component';

describe('AdminSeancesCreateComponent', () => {
  let component: AdminSeancesCreateComponent;
  let fixture: ComponentFixture<AdminSeancesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSeancesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSeancesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
