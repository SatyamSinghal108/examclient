import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartInstructionsComponent } from './start-instructions.component';

describe('StartInstructionsComponent', () => {
  let component: StartInstructionsComponent;
  let fixture: ComponentFixture<StartInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartInstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
