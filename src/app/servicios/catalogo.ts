import {
  Injectable,
  computed,
  inject,
  signal
} from '@angular/core';

import {
  toSignal
} from '@angular/core/rxjs-interop';

import {
  BehaviorSubject,
  catchError,
  map,
  of,
  startWith,
  switchMap
} from 'rxjs';

import type {
  Categoria,
  Clase
} from '../modelos/clase';

import {
  ClasesApi
} from './clases-api';

interface EstadoCatalogo {
  clases: Clase[];
  cargando: boolean;
  error: unknown | null;
}

@Injectable({
  providedIn: 'root'
})
export class Catalogo {

  private clasesApi = inject(ClasesApi);

  private busqueda =
    new BehaviorSubject<string>('');

  private estado = toSignal(
    this.busqueda.pipe(
      switchMap((q) =>
        this.clasesApi.buscar(q).pipe(
          map((respuesta) => ({
            clases: respuesta.data,
            cargando: false,
            error: null
          } as EstadoCatalogo)),

          catchError((error) =>
            of({
              clases: [],
              cargando: false,
              error
            } as EstadoCatalogo)
          ),

          startWith({
            clases: [],
            cargando: true,
            error: null
          } as EstadoCatalogo)
        )
      )
    ),
    {
      initialValue: {
        clases: [],
        cargando: true,
        error: null
      } as EstadoCatalogo
    }
  );

  categoria =
    signal<Categoria | 'todas'>('todas');

  seleccionada =
    signal<Clase | null>(null);

  clases = computed(
    () => this.estado().clases
  );

  cargando = computed(
    () => this.estado().cargando
  );

  error = computed(
    () => this.estado().error
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

  buscar(q: string) {
    this.busqueda.next(
      q.trim()
    );

    this.seleccionada.set(null);
  }

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

  recargar() {
    this.busqueda.next(
      this.busqueda.value
    );
  }

  restaurarCatalogo() {
    this.buscar('');
  }

  vaciarCatalogo() {
    this.seleccionada.set(null);
  }
}