# Proyecto Final TOPICOS AVANZADOS DE DESARROLLO WEB
Para ejecutar se requiere tener instalado Docker y MongoDB. Para ejecutar este proyecto:
* Descargar repositorio en un directorio nuevo
* Abrir Docker
* De estar en Windows y de estar activado, apagar el servicio de MongoDB Database Server
* Ejecutar en la raiz del directorio ``docker-compose up``
¡Listo! Ya debería haberse ejecutado el proyecto.

**Nota:** El sistema de recomendación actualiza sus recomendaciones cada 5 segundos si es que recientemente se ha interactuado apretando en algún título. La recomendación se basa en la categoría de las películas que se haya seleccionado, produciendo y consumiendo en un estilo LIFO. Ejemplo, si se presiono en un drama y luego en una comedia, primero se recomendara películas del género Drama y luego de 5 segundos se recomendaran películas del género de comedia. 
