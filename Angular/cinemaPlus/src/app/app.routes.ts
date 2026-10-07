import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Bienvenida } from './bienvenida/bienvenida';
import { Anuncio } from './anuncio/anuncio';
import { Examen } from './examen/examen';
import { Usuario } from './usuario/usuario';
import { Sala } from './sala/sala';
import { GeneroPelicula } from './genero-pelicula/genero-pelicula';
import { ClasificacionPelicula } from './clasificacion-pelicula/clasificacion-pelicula';

export const routes: Routes = [
    {path:'', component: Login},
    {path:'bienvenida', component: Bienvenida},
    {path: 'anuncio', component: Anuncio},
    {path: 'examen', component: Examen},
    {path: 'usuario', component: Usuario},
    {path: 'sala', component: Sala},
    {path: 'genero', component: GeneroPelicula},
    {path: 'clasificacion', component: ClasificacionPelicula}
];
