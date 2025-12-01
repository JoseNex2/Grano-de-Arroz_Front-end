# Grano de Arroz — Front-end

Cliente web construido con Angular (standalone components), PrimeNG y Tailwind CSS para la interfaz de usuario del proyecto "Grano de Arroz".

## Resumen
Aplicación SPA con rutas públicas y privadas, gestión de usuarios y componentes principales para administración (clientes, tablas, menús). Pensada para usarse con el backend del proyecto principal.

## Características principales
- Angular (componentes standalone)
- UI con PrimeNG (tema Aura) + Tailwind CSS
- Rutas públicas y privadas
- Layout con componentes reutilizables: NavBar, MenuBar, Main
- Tablas y manejo de datos de clientes

## Estructura clave
- src/main.ts — arranque
- src/app/app.ts — componente raíz
- src/app/app.config.ts — providers globales (router, PrimeNG, animaciones)
- src/app/app.routes.ts — rutas principales
- src/app/pages/public/publicRoutes.ts — rutas públicas
- src/app/pages/private/privateRoutes.ts — rutas protegidas
- src/app/pages/private/main — área privada (Main, CustomerComponent, CustomerTableComponent)
- src/styles.css — estilos globales (Tailwind + tema PrimeNG)

## Requisitos
- Node.js (recomendado LTS, v18+)
- npm (o yarn)
- Angular CLI (opcional)

## Instalación
1. Clona el repositorio:
   git clone <repository-url>
2. Entra al proyecto:
   cd Grano-de-Arroz_Front-end
3. Instala dependencias:
   npm ci

## Desarrollo
Inicia el servidor de desarrollo (hot reload):
npm run start
o
ng serve

Abre: http://localhost:4200

(En Windows: PowerShell o CMD en la carpeta del proyecto)

## Build / Producción
Genera la build:
npm run build
o
ng build --prod

Los artefactos de salida quedan en /dist.

## Tests
Pruebas unitarias:
npm run test
o
ng test

E2E:
npm run e2e
o
ng e2e

## Configuración
- Environment files: src/environments/*.ts
- Providers globales en src/app/app.config.ts
- Añade nuevas rutas en publicRoutes o privateRoutes según correspondan

## Contribuir
- Abrir issues para bugs o mejoras
- Crear branches por feature/bugfix
- PRs con descripción, pruebas y lint pasados

## Licencia
Incluye archivo LICENSE en el repo. Si no hay uno, usar una licencia apropiada (MIT, Apache-2.0, etc.)

## Soporte
Para preguntas o problemas: abrir un issue en el repositorio con pasos para reproducir y logs relevantes.