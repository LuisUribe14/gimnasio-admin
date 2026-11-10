import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';

import { RouterLink } from '@angular/router';
import { FiltroCategoria } from '../../componentes/filtro-categoria/filtro-categoria';
import { TarjetaClase } from '../../componentes/tarjeta-clase/tarjeta-clase';
import { Catalogo } from '../../servicios/catalogo';

@Component({
  selector: 'app-lista-clases',
  imports: [
    TarjetaClase,
    FiltroCategoria,
    RouterLink
  ],
  templateUrl: './lista-clases.html',
  styleUrl: './lista-clases.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class ListaClases {
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