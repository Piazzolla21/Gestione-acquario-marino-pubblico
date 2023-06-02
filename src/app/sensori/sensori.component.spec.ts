import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensoriComponent } from './sensori.component';

describe('SensoriComponent', () => {
  let component: SensoriComponent;
  let fixture: ComponentFixture<SensoriComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SensoriComponent]
    });
    fixture = TestBed.createComponent(SensoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
