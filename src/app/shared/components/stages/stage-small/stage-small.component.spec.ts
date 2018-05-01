import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageSmallComponent } from './stage-small.component';

describe('StageSmallComponent', () => {
  let component: StageSmallComponent;
  let fixture: ComponentFixture<StageSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
