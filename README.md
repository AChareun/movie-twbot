# [Movie Twitter Bot](https://twitter.com/MovieDispenser)

## Español

Bot de Twitter que responde a menciones con recomendaciones de películas aleatorias. La aleatoriedad puede ser limitada incluyendo parámetros en la mención. La lista de parámetros soportados por el bot están incluidos en este documento.

Este producto utiliza la API de [TMDb](https://www.themoviedb.org/) pero no es avalado ni certificado por TMDb.

### Funcionamiento

Gracias al método `.stream` de [Twit](https://www.npmjs.com/package/twit), la aplicación filtra aquellos tweets en los que el handle del bot es incluido y responde exclusivamente a ellos luego de realizar las operaciones necesarias para construir la respuesta.

- En el caso feliz, el bot es mencionado en un tweet que incluya sólo la mención o parámetros utilizados correctamente sumados a la misma (siguiendo la estructura **param=value param:value**). Luego de realizar las peticiones a la API de TMDb, responde con la información de una película.

- Frente a una mención con una estructura incorrecta, el bot responde haciéndolo saber e incluye una cita a un tweet con instrucciones.

- En el caso de que ocurriera un error con la API de TMDb, el bot lo informará pero también incluirá una película recomendada del archivo `fallback-movies.js` de la carpeta `fallback`.


### Instalación y configuración

Para instalar la aplicación, descargue el repositorio y ejecute `npm install` en el directorio raíz.

Es necesario suministrar a la aplicación con API Keys de Twitter y TMDb así como también del 'handle' de Twitter desde el que funcionará el bot. Para esto, una vez haya obtenido sus keys, incluya un archivo llamado **.env** en el directorio raíz con la siguiente estructura y completando con sus datos:

```
# Twitter Handle

TWHANDLE=''

# Twitter Consumer Keys

API_CONSUMER_KEY=''
API_CONSUMER_SECRET=''

# Twitter Access Tokens

ACCESS_TOKEN=''
ACCESS_SECRET=''

# TMDB Keys

API_KEY=''
READ_TOKEN=''
```

El repositorio incluye algunos scripts para desarrollo y producción:

```
- npm start: corre la aplicación en modo producción

- npm run dev: corre la aplicación en modo desarrollo

```

### Parámetros soportados 

Los parámetros disponibles para incluir en las mención dependen tanto de la API de TMDb como de la implementación en el código de ésta aplicación.

De momento, se puede limitar la aleatoriedad de la película aclarando **género, año de estreno e idioma original**. Está planeado implementar más parámetros.


## English

Twitter bot that replies to mentions with random movie recommendations. The randomness can be limited by including parameters in the mention. The list of supported parameters are listed in this document.

This product uses the [TMDb](https://www.themoviedb.org/) API but is not endorsed or certified by TMDb.
