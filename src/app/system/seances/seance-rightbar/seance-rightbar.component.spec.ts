import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeanceRightbarComponent } from './seance-rightbar.component';

describe('SeanceRightbarComponent', () => {
  let component: SeanceRightbarComponent;
  let fixture: ComponentFixture<SeanceRightbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeanceRightbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeanceRightbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
