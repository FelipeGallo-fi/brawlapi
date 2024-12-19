# Brawl API

## Introduccion

Bienvenidos a la API de brawl stars. Esta api te permite crear, editar, eliminar usuarios. Ver brawlers, eliminarlos y elegirlos como tus favoritos. Generar batallas, editarlas y eliminarlas. 

## Comenzando

### Prerrequisitos
- Node.js
- npm
- serve
- docker
- nodemon
- prisma
- cors
- bruno

### Instalación
1. Clonar el repositorio:
      ```bash
      git clone git@github.com:FelipeGallo-fi/brawlapi.git
      ```
2. Navegar al directorio del proyecto:
      ```bash
      cd brawlapi
      ```
3. Instalar las dependencias:
      ```bash
      cd front
         - npm install
      cd back
         -npm install
      ```

## Uso

### Ejecutando la API

Configurar el archivo .env:
   -DATABASE_URL="postgresql://usuario:contraseña@servidor:puerto/nombre_db"

Para iniciar el servidor Front, ejecutar:
   ```bash
   cd front 
      - npm run start 
      - http://0.0.0.0:8000
      ![ejemplo servidor front](images/image-1.png)
   ```

Para iniciar el servidor Back, ejecutar:
   ```bash
   cd back 
      - docker compose up -d 
      - npm run dev
      ![ejemplo servidor back](images/image.png)
   ```

### Cargando Información con Bruno

Para cargar información usando Bruno, sigue estos pasos:

1. Instalar Bruno:
   ```bash
   snap install bruno
   ```

2. Exportar la colección desde el directorio `back`:
   ```bash
   cd back
   npm run export-collection
   ```

3. Abrir Bruno y cargar la colección exportada:
   - Iniciar Bruno desde el menú de aplicaciones.
   - Hacer clic en `Import Collection`.
   - Navegar al archivo de la colección exportada y seleccionarlo para cargar la información.

![Ejemplo bruno](images/example_bruno.png)

### Creando Datos

Para crear los datos iniciales para la aplicación, sigue estos pasos:

#### Creando Brawlers

1. Abrir Bruno y asegurarse de que la colección esté cargada.
2. Navegar a la solicitud `crear brawler`.
3. Rellenar los campos requeridos con la información del brawler:
   ```json
   {
      "nombre": "Colt",
      "tipo": "Francotirador",
      "rareza": "Común",
      "descripcion": "Un tirador rápido",
      "ataque": "Disparo rápido",
      "super": "Ráfaga de balas",
      "starPower": "Slick Boots",
      "gadget": "Speedloader",
      "poder": 100,
      "defensa": 20
   }
   ```
4. Enviar la solicitud para crear el brawler.
5. Repetir el proceso para brawlers adicionales.

#### Creando Usuarios

1. Navegar a la solicitud `crear usuario` en Bruno.
2. Rellenar los campos requeridos con la información del usuario:
   ```json
   {
     "nombre": "NuevoUsuario",
     "region": "EU",
     "edad": 25,
     "brawlerFav": "Colt" (debe existir en la base de datos)
   }
   ```
3. Enviar la solicitud para crear el usuario.
4. Repetir el proceso para usuarios adicionales.

#### Creando Batallas

1. Navegar a la solicitud `crear batalla` en Bruno.
2. Rellenar los campos requeridos con la información de la batalla:
   ```json
   {
     "usuario1": "NuevoUsuario",
     "usuario2": "OtroUsuario",
     "brawler1": "Shelly",
     "brawler2": "Colt",
     "resultado": "Pendiente"
   }
   ```
3. Enviar la solicitud para crear la batalla.
4. Repetir el proceso para batallas adicionales.

Siguiendo estos pasos, habrás creado los datos iniciales para brawlers, usuarios y batallas en la aplicación.