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
import { ClasesApi } from '../../servicios/clases-api';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-lista-clases',
  imports: [
    TarjetaClase,
    FiltroCategoria,
    RouterLink,
    ReactiveFormsModule
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

  private clasesApi = inject(ClasesApi);

  eliminarClase(id: number) {
    const confirmar = confirm(
      '¿Seguro que quieres eliminar esta clase?'
    );

    if (!confirmar) {
      return;
    }

    this.clasesApi
      .eliminar(id)
      .subscribe({
        next: () => {
          this.catalogo.seleccionada.set(null);
          this.catalogo.recargar();
        },

        error: (error) => {
          console.error(
            'Error al eliminar la clase:',
            error
          );

          alert(
            'No se pudo eliminar la clase.'
          );
        }
      });
  }
  busqueda = new FormControl('', {
    nonNullable: true
  });

  constructor() {
    this.busqueda.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        takeUntilDestroyed()
      )
      .subscribe((texto) => {
        this.catalogo.buscar(texto);
      });
  }
}