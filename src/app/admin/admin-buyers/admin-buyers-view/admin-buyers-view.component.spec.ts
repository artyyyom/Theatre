import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBuyersViewComponent } from './admin-buyers-view.component';

describe('AdminBuyersViewComponent', () => {
  let component: AdminBuyersViewComponent;
  let fixture: ComponentFixture<AdminBuyersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBuyersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBuyersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
