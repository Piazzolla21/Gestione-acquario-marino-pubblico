import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VascaComponent } from './vasca.component';

describe('VascaComponent', () => {
  let component: VascaComponent;
  let fixture: ComponentFixture<VascaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VascaComponent]
    });
    fixture = TestBed.createComponent(VascaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
