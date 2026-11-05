import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';

import { Catalogo } from '../../servicios/catalogo';
import type { Categoria } from '../../modelos/clase';

@Component({
  selector: 'app-filtro-categoria',
  imports: [],
  templateUrl: './filtro-categoria.html',
  styleUrl: './filtro-categoria.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class FiltroCategoria {
  catalogo = inject(Catalogo);

  cambiar(
    categoria: Categoria | 'todas'
  ) {
    this.catalogo.cambiarCategoria(categoria);
  }
}