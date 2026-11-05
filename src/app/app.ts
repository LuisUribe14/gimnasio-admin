import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';

import { FiltroCategoria } from './componentes/filtro-categoria/filtro-categoria';
import { TarjetaClase } from './componentes/tarjeta-clase/tarjeta-clase';
import { Catalogo } from './servicios/catalogo';

@Component({
  selector: 'app-root',
  imports: [
    TarjetaClase,
    FiltroCategoria
  ],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.css'
})
export class App {
  catalogo = inject(Catalogo);

  totalClases = computed(() =>
    this.catalogo.clasesVisibles().length
  );

  clasesLargas = computed(() =>
    this.catalogo.clasesVisibles().filter(
      (clase) => clase.duracionMin >= 60
    ).length
  );

  vaciarCatalogo() {
    this.catalogo.vaciarCatalogo();
  }

  restaurarCatalogo() {
    this.catalogo.restaurarCatalogo();
  }
}