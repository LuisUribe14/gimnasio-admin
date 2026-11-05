import {
  Injectable,
  computed,
  signal
} from '@angular/core';

import type {
  Categoria,
  Clase
} from '../modelos/clase';

import {
  CLASES_LOCALES
} from '../datos/clases-locales';

@Injectable({
  providedIn: 'root'
})
export class Catalogo {
  clases = signal<Clase[]>(CLASES_LOCALES);

  categoria = signal<Categoria | 'todas'>('todas');

  seleccionada = signal<Clase | null>(null);

  clasesVisibles = computed(() => {
    const categoriaActual =
      this.categoria();

    if (categoriaActual === 'todas') {
      return this.clases();
    }

    return this.clases().filter(
      (clase) =>
        clase.categoria === categoriaActual
    );
  });

  minutosTotales = computed(() =>
    this.clasesVisibles().reduce(
      (total, clase) =>
        total + clase.duracionMin,
      0
    )
  );

  clasesLargas = computed(() =>
    this.clasesVisibles().filter(
      (clase) =>
        clase.duracionMin >= 60
    ).length
  );

  cambiarCategoria(
    categoria: Categoria | 'todas'
  ) {
    this.categoria.set(categoria);

    const seleccionada =
      this.seleccionada();

    if (
      seleccionada &&
      !this.clasesVisibles().some(
        (clase) =>
          clase.id === seleccionada.id
      )
    ) {
      this.seleccionada.set(null);
    }
  }

  seleccionarClase(
    clase: Clase
  ) {
    this.seleccionada.set(clase);
  }

  vaciarCatalogo() {
    this.clases.set([]);
    this.seleccionada.set(null);
  }

  restaurarCatalogo() {
    this.clases.set(CLASES_LOCALES);
  }
}