## Respuestas

### Practica 20

### ¿Qué diferencia hay entre un signal y un computed, y cuál se parece a useState y cuál a useMemo?
Un signal almacena un valor que puede cambiar durante la ejecucion de la aplicacion y el computed calcula un valor a partir de uno o mas signals y se actualiza automaticamente cuando esos valores cambian

### ¿Qué pasa si el filtro hace new Catalogo() en lugar de inject(Catalogo)?
Si se utiliza new Catalogo() se crea una instancia diferente del servicio entonces el filtro tendria su propio estado y no compartiria los mismos signals que usa el resto de la aplicacion y con el con inject(Catalogo) Angular entrega la misma instancia del servicio proporcionada en la aplicacion permitiendo que los componentes compartan el mismo estado
