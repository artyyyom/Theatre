import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSeancesViewComponent } from './admin-seances-view.component';

describe('AdminSeancesViewComponent', () => {
  let component: AdminSeancesViewComponent;
  let fixture: ComponentFixture<AdminSeancesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSeancesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSeancesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
