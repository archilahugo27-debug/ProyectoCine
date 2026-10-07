import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClasificacionPelicula } from './clasificacion-pelicula';

describe('ClasificacionPelicula', () => {
  let component: ClasificacionPelicula;
  let fixture: ComponentFixture<ClasificacionPelicula>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClasificacionPelicula],
    }).compileComponents();

    fixture = TestBed.createComponent(ClasificacionPelicula);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
