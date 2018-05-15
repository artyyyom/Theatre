import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryPlacesComponent } from './admin-category-places.component';

describe('AdminCategoryPlacesComponent', () => {
  let component: AdminCategoryPlacesComponent;
  let fixture: ComponentFixture<AdminCategoryPlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCategoryPlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoryPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
