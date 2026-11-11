import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloProduccion } from './modulo-produccion';

describe('ModuloProduccion', () => {
  let component: ModuloProduccion;
  let fixture: ComponentFixture<ModuloProduccion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuloProduccion],
    }).compileComponents();

    fixture = TestBed.createComponent(ModuloProduccion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
