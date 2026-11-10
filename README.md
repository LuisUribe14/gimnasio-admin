## Respuestas

### Practica 21

### 1. ¿Qué pieza de React Router corresponde a router-outlet, routerLink y routerLinkActive?
Router-outlet corresponde a una funcion parecida a <Outlet /> del React Router pq es el lugar donde se muestra el componente de la ruta actual y el routerLink corresponde a <Link /> o <NavLink /> ya que permite navegar entre rutas sin recargar toda la pagina y el routerLinkActive se parece a la funcionalidad de NavLink pq permite aplicar una clase cuando el enlace corresponde a la ruta activa

### 2. ¿Por qué la ruta comodín (**) va al final y la ruta vacía necesita pathMatch: 'full'?
La ruta comodin ** se coloca al final porque coincide con cualquier ruta que no haya sido encontrada antes entonces si se colocara primero atraparia las demas rutas y
la ruta vacia necesita pathMatch: 'full' para que la redireccion ocurra solamente cuando la URL este completamente vacia sin esto podria coincidir tambien con otras rutas que comienzan desde la raiz

### 3. ¿Dónde vive el valor de un campo en un formulario reactivo y en qué se diferencia del useState de React?
En un formulario reactivo de Angular el valor de cada campo vive dentro de su FormControl que forma parte del FormGroup a diferencia de useState en React no es necesario crear un estado separado para cada campo pq Angular administra el valor el estado de validacion si el campo fue tocado y otros datos directamente dentro del control del formulario

### 4. ¿Qué regresa un validador propio cuando el valor es válido y cuando no, y cómo se relaciona con hasError?
Un validador propio regresa null cuando el valor es valido entonces cuando el valor no es valido regresa un objeto con el nombre del error y después se puede usar hasError('bloqueCinco') para comprobar si ese error esta presente y mostrar el mensaje correspondiente

### 5. ¿Qué cambió en el servicio del catálogo y por qué ningún componente se enteró?
El servicio dejo de obtener las clases desde un arreglo local y comenzo a obtenerlas desde la API mediante httpResource con GET /clases entonces los componentes casi no tuvieron que cambiar porque siguen leyendo la informacion desde el mismo servicio Catalogo y el servicio mantiene la misma responsabilidad de exponer las clases visibles, los filtros y los datos calculados aunque internamente cambio la fuente de los datos

### 6. ¿Por qué no hizo falta iniciar sesión para leer el catálogo?
No fue necesario iniciar sesion porque el endpoint GET /clases es publico y permite consultar el catalogo sin enviar un token de autenticacion y por eso Angular puede realizar la peticion directamente y mostrar las clases aunque el usuario no haya iniciado sesion
