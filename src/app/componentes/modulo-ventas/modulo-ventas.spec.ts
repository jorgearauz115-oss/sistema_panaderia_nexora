import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloVentas } from './modulo-ventas';

describe('ModuloVentas', () => {
  let component: ModuloVentas;
  let fixture: ComponentFixture<ModuloVentas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuloVentas],
    }).compileComponents();

    fixture = TestBed.createComponent(ModuloVentas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
