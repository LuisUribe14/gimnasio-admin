import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_URL } from '../config';
import type { Categoria, Clase } from '../modelos/clase';

export interface ClaseNueva {
    nombre: string;
    categoria: Categoria;
    descripcion: string;
    duracionMin: number;
    imagen: string;
}

interface RespuestaClase {
    data: Clase;
}

@Injectable({
    providedIn: 'root'
})
export class ClasesApi {
    private http = inject(HttpClient);

    crear(clase: ClaseNueva) {
        return this.http.post<RespuestaClase>(
            `${API_URL}/clases`,
            clase
        );
    }

    obtener(id: number) {
        return this.http.get<RespuestaClase>(
            `${API_URL}/clases/${id}`
        );
    }

    actualizar(
        id: number,
        clase: ClaseNueva
    ) {
        return this.http.patch<RespuestaClase>(
            `${API_URL}/clases/${id}`,
            clase
        );
    }

    eliminar(id: number) {
        return this.http.delete<RespuestaClase>(
            `${API_URL}/clases/${id}`
        );
    }
}