import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeanceOrderComponent } from './seance-order.component';

describe('SeanceOrderComponent', () => {
  let component: SeanceOrderComponent;
  let fixture: ComponentFixture<SeanceOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeanceOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeanceOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
