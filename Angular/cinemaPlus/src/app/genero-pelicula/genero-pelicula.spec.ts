import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneroPelicula } from './genero-pelicula';

describe('GeneroPelicula', () => {
  let component: GeneroPelicula;
  let fixture: ComponentFixture<GeneroPelicula>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneroPelicula],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneroPelicula);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
