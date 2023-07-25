import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPrestamoComponent } from './buscar-prestamo.component';

describe('BuscarPrestamoComponent', () => {
  let component: BuscarPrestamoComponent;
  let fixture: ComponentFixture<BuscarPrestamoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarPrestamoComponent]
    });
    fixture = TestBed.createComponent(BuscarPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
