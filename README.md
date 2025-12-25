# Products Microservice

Microservicio de gestión de productos para e-commerce construido con NestJS, Prisma y PostgreSQL. Implementa arquitectura limpia con casos de uso y validación de datos.

## Tecnologías

- **NestJS** - Framework Node.js para aplicaciones escalables
- **Prisma** - ORM moderno para PostgreSQL
- **PostgreSQL** - Base de datos relacional
- **TypeScript** - Tipado estático
- **Class Validator** - Validación de DTOs
- **UUID** - Identificadores únicos

## Características

- ✅ CRUD completo de productos
- ✅ Búsqueda unificada por UUID, slug o título
- ✅ Paginación con validación de límites
- ✅ Arquitectura limpia con casos de uso
- ✅ Validación automática de datos
- ✅ Timestamps automáticos (createdAt/updatedAt)
- ✅ Manejo de errores con mensajes descriptivos

## Modelo de Producto

```typescript
{
  id: string           // UUID único
  title: string        // Título único del producto
  description?: string // Descripción opcional
  price: number        // Precio (default: 0)
  stock: number        // Stock disponible (default: 0)
  slug: string         // Slug único para URLs
  sizes: ValidSizes[]  // Tallas: XS, S, M, L, XL, XXL, XXXL
  tags: string[]       // Etiquetas del producto
  type: ValidTypes     // Tipo: shirts, pants, hoodies, hats
  gender: ValidGender  // Género: men, women, kid, unisex
  createdAt: DateTime  // Fecha de creación (automático)
  updatedAt: DateTime  // Fecha de actualización (automático)
}
```

## Instalación

```bash
# Clonar repositorio
git clone <repository-url>
cd products-ms

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Ejecutar migraciones de Prisma
npx prisma migrate dev

# Generar cliente de Prisma
npx prisma generate
```

## Variables de Entorno

```env
DATABASE_URL="postgresql://user:password@localhost:5432/products_db"
PORT=3001
```

## Scripts Disponibles

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod

# Tests
npm run test
npm run test:watch
npm run test:cov

# Linting
npm run lint

# Formateo
npm run format

# Prisma
npx prisma studio          # Interfaz gráfica de BD
npx prisma migrate dev     # Crear migración
npx prisma generate        # Generar cliente
```

## API Endpoints

### Crear Producto
```http
POST /products
Content-Type: application/json

{
  "title": "Classic White T-Shirt",
  "description": "100% cotton white t-shirt",
  "price": 29.99,
  "stock": 100,
  "slug": "classic-white-tshirt",
  "sizes": ["S", "M", "L", "XL"],
  "tags": ["casual", "summer"],
  "type": "shirts",
  "gender": "unisex"
}
```

**Respuesta:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Classic White T-Shirt",
  "description": "100% cotton white t-shirt",
  "price": 29.99,
  "stock": 100,
  "slug": "classic-white-tshirt",
  "sizes": ["S", "M", "L", "XL"],
  "tags": ["casual", "summer"],
  "type": "shirts",
  "gender": "unisex",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### Listar Productos (con paginación)
```http
GET /products?page=1&limit=10
```

**Respuesta:**
```json
{
  "meta": {
    "total": 50,
    "page": 1,
    "lastPage": 5
  },
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Classic White T-Shirt",
      "slug": "classic-white-tshirt",
      ...
    }
  ]
}
```

**Validación:**
- Si `page > lastPage`, retorna error 400
- `limit` por defecto: 10
- `page` por defecto: 1

### Buscar Producto (por ID, slug o título)
```http
# Por UUID
GET /products/550e8400-e29b-41d4-a716-446655440000

# Por slug
GET /products/classic-white-tshirt

# Por título (case insensitive)
GET /products/Classic%20White%20T-Shirt
```

**Respuesta:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Classic White T-Shirt",
  "description": "100% cotton white t-shirt",
  "price": 29.99,
  "stock": 100,
  "slug": "classic-white-tshirt",
  "sizes": ["S", "M", "L", "XL"],
  "tags": ["casual", "summer"],
  "type": "shirts",
  "gender": "unisex",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Lógica de búsqueda:**
1. Si `term` es un UUID válido → busca por `id`
2. Si no es UUID → busca por `title` (case insensitive) o `slug` (lowercase)
3. Si no encuentra → retorna 404

### Actualizar Producto
```http
PATCH /products/{id}
Content-Type: application/json

{
  "price": 24.99,
  "stock": 150
}
```

### Eliminar Producto
```http
DELETE /products/{id}
```

## Estructura del Proyecto

```
src/
├── common/
│   └── dtos/
│       ├── pagination.dto.ts      # DTO de paginación
│       └── index.ts
├── products/
│   ├── dto/
│   │   ├── create-product.dto.ts
│   │   ├── update-product.dto.ts
│   │   └── index.ts
│   ├── use-cases/
│   │   ├── create-product.use-case.ts
│   │   ├── getAl-product.use-case.ts
│   │   ├── find-product-by-term.use-case.ts
│   │   └── index.ts
│   ├── products.controller.ts
│   ├── products.service.ts
│   └── products.module.ts
├── prisma.service.ts
├── app.module.ts
└── main.ts
```

## Arquitectura

El proyecto sigue el patrón de **Arquitectura Limpia** con:

- **Controllers**: Manejan las peticiones HTTP
- **Services**: Orquestan los casos de uso
- **Use Cases**: Contienen la lógica de negocio
- **DTOs**: Validación de datos de entrada
- **Prisma**: Capa de acceso a datos

### Flujo de una petición

```
HTTP Request
    ↓
Controller (validación de parámetros)
    ↓
Service (orquestación)
    ↓
Use Case (lógica de negocio)
    ↓
Prisma (acceso a datos)
    ↓
PostgreSQL
```

## Validaciones

### PaginationDto
```typescript
{
  page?: number;    // Mínimo: 1 (default: 1)
  limit?: number;   // Mínimo: 1 (default: 10)
}
```

### CreateProductDto
- `title`: requerido, string, único
- `description`: opcional, string
- `price`: requerido, número positivo
- `stock`: requerido, número entero positivo
- `slug`: requerido, string, único
- `sizes`: requerido, array de ValidSizes
- `tags`: requerido, array de strings
- `type`: requerido, ValidTypes
- `gender`: requerido, ValidGender

## Manejo de Errores

El microservicio retorna errores HTTP estándar:

- **400 Bad Request**: Validación fallida o página inexistente
- **404 Not Found**: Producto no encontrado
- **500 Internal Server Error**: Error del servidor

Ejemplos:

```json
// Página inexistente
{
  "message": "Page 10 does not exist. The last available page is 5",
  "error": "Bad Request",
  "statusCode": 400
}

// Producto no encontrado
{
  "message": "Product with term \"invalid-slug\" not found",
  "error": "Not Found",
  "statusCode": 404
}
```

## Base de Datos

### Prisma Studio
Para explorar la base de datos visualmente:

```bash
npx prisma studio
```

Abre en `http://localhost:5555`

### Migraciones

```bash
# Crear nueva migración
npx prisma migrate dev --name nombre_migracion

# Aplicar migraciones en producción
npx prisma migrate deploy

# Reset de base de datos (desarrollo)
npx prisma migrate reset
```

## Testing

```bash
# Tests unitarios
npm run test

# Tests con coverage
npm run test:cov

# Tests en modo watch
npm run test:watch

# Tests e2e
npm run test:e2e
```

## Deployment

### Build para producción
```bash
npm run build
```

### Variables de entorno en producción
```env
DATABASE_URL="postgresql://user:password@host:5432/db"
PORT=3001
NODE_ENV=production
```

### Docker (próximamente)
```dockerfile
# Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD ["npm", "run", "start:prod"]
```

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Convenciones de Código

- Usar TypeScript estricto
- Seguir principios SOLID
- Casos de uso para lógica de negocio
- DTOs para validación
- Mensajes de error descriptivos en inglés
- Commits descriptivos

## Roadmap

- [ ] Autenticación y autorización
- [ ] Upload de imágenes de productos
- [ ] Filtros avanzados (precio, categoría, etc.)
- [ ] Búsqueda full-text
- [ ] Cache con Redis
- [ ] Rate limiting
- [ ] Docker y Docker Compose
- [ ] CI/CD con GitHub Actions
- [ ] Documentación con Swagger
- [ ] Tests e2e completos

## Licencia

UNLICENSED

## Autor

Francisco Javier Moreno García

## Soporte

Para reportar bugs o solicitar features, abre un issue en el repositorio.
