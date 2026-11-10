import {
  Injectable,
  computed,
  signal
} from '@angular/core';

import {
  httpResource
} from '@angular/common/http';

import type {
  Categoria,
  Clase
} from '../modelos/clase';

import { API_URL } from '../config';

interface RespuestaClases {
  data: Clase[];
  meta: {
    ruta: string;
    duracionMs: number;
    timestamp: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class Catalogo {

  private recursoClases =
    httpResource<RespuestaClases>(
      () => `${API_URL}/clases`
    );

  categoria =
    signal<Categoria | 'todas'>('todas');

  seleccionada =
    signal<Clase | null>(null);

  clases = computed(
    () =>
      this.recursoClases.value()?.data ?? []
  );

  cargando = computed(
    () => this.recursoClases.isLoading()
  );

  error = computed(
    () => this.recursoClases.error()
  );

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
    const respuesta =
      this.recursoClases.value();

    if (respuesta) {
      this.recursoClases.set({
        ...respuesta,
        data: []
      });
    }

    this.seleccionada.set(null);
  }

  restaurarCatalogo() {
    this.recursoClases.reload();
  }

  recargar() {
    this.recursoClases.reload();
  }
}