# AI-First Software Architecture

Una arquitectura de software diseñada específicamente para que las IAs puedan entender, modificar y escalar fácilmente sin romper el sistema.

## 🎯 Problema que Resuelve

Las IAs actuales cometen errores al programar porque:
- No entienden las dependencias entre componentes
- Modifican múltiples archivos sin entender el impacto
- No tienen contexto sobre las reglas del proyecto
- Rompen tests y funcionalidades existentes

**Esta arquitectura soluciona estos problemas** con componentes aislados, contexto explícito para IA, y herramientas de validación automática.

## 🏗️ Estructura Real del Proyecto

```
ai-first-architecture/
├── components/                    # Componentes aislados
│   ├── forms/
│   │   └── ProductForm/          # ✅ Componente de ejemplo funcionando
│   │       ├── component.json    # Metadatos del componente
│   │       ├── interface.json    # Definición de inputs/outputs
│   │       ├── logic.js          # Lógica del componente
│   │       └── tests.js          # Tests unitarios
│   ├── services/
│   │   └── UserService/          # ✅ Servicio de ejemplo funcionando
│   │       ├── component.json
│   │       ├── interface.json
│   │       ├── logic.js
│   │       └── tests.js
│   └── workflows/                # Para flujos complejos
├── ai-tools/                     # 🤖 Herramientas específicas para IA
│   ├── ai-helper.js              # Análisis de componentes
│   ├── change-validator.js       # Validación de cambios
│   ├── impact-analyzer.js        # Análisis de impacto
│   └── rollback-manager.js       # Sistema de rollback
├── metadata/                     # 📋 Contexto para IA
│   ├── ai-context.json           # ⭐ IMPORTANTE: Reglas para IA
│   ├── component-map.json        # Mapa de dependencias
│   ├── test-matrix.json          # Configuración de tests
│   └── visual-coverage.json      # Cobertura de tests visuales
├── core/
│   └── event-bus.js              # Sistema de eventos
├── scripts/
│   ├── setup.js                  # Setup del proyecto
│   ├── generate-component.js     # Generador de componentes
│   ├── validate-architecture.js  # Validador de arquitectura
│   └── dev-server.js             # Servidor de desarrollo
├── tests/
│   ├── jest.setup.js             # Configuración de Jest
│   ├── component/                # Tests por componente
│   ├── integration/              # Tests de integración
│   └── ai-validation/            # Tests específicos para IA
├── visual-testing/               # Testing visual con Playwright
│   ├── baselines/                # Screenshots de referencia
│   ├── diffs/                    # Diferencias detectadas
│   ├── reports/                  # Reportes de tests visuales
│   └── visual-scenarios/         # Escenarios de testing
├── package.json                  # ✅ Configurado con scripts
├── playwright.config.js          # ✅ Configuración de Playwright
└── README.md                     # Esta documentación
```

## 🚀 Instalación y Setup

### Prerrequisitos
- Node.js 18+ 
- npm 8+
- Git

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/webmasterscity/ai-first-architecture-one.git
cd ai-first-architecture-one

# Instalar dependencias
npm install

# Instalar Playwright para tests visuales
npx playwright install

# En Ubuntu/Linux también ejecutar:
npx playwright install-deps
```

### Verificar Instalación
```bash
# Verificar que todo funciona
npm test

# Iniciar servidor de desarrollo
npm run dev
```

## 📋 Comandos Disponibles

### Desarrollo General
```bash
npm run dev                    # Servidor de desarrollo (puerto 3000)
npm test                       # Ejecutar todos los tests
npm run lint                   # Verificar código
npm run validate:architecture  # Validar estructura del proyecto
```

### Generación de Componentes
```bash
# Crear un nuevo componente (formulario)
npm run generate:component MiComponente forms

# Crear un nuevo servicio
npm run generate:component MiServicio services

# Crear un nuevo workflow
npm run generate:component MiWorkflow workflows
```

### Herramientas para IA 🤖
```bash
# Analizar impacto de cambios en un componente
npm run ai:analyze ProductForm

# Validar cambios antes de aplicarlos
npm run ai:validate ProductForm

# Ver ayuda de herramientas para IA
npm run ai:help

# Sistema de rollback (en caso de errores)
npm run ai:rollback
```

### Testing Visual (Playwright)
```bash
# Ejecutar tests visuales
npm run test:visual

# Generar nuevas capturas de referencia
npm run visual:baseline

# Actualizar capturas existentes
npm run visual:update

# Ver reporte de tests visuales
npm run visual:report

# Analizar cambios visuales
npm run visual:analyze
```

## 🧩 Ejemplos Incluidos

### 1. ProductForm (Componente de Formulario)
- **Ubicación**: `components/forms/ProductForm/`
- **Funcionalidad**: Formulario para crear/editar productos con validación
- **Tests**: ✅ Tests unitarios completos
- **IA-Ready**: ✅ Metadatos completos para IA

```javascript
// Ejemplo de uso
const ProductForm = require('./components/forms/ProductForm/logic');
const form = new ProductForm(container, productData, options);
```

### 2. UserService (Servicio de Datos)
- **Ubicación**: `components/services/UserService/`
- **Funcionalidad**: Gestión de usuarios (CRUD básico)
- **Tests**: ✅ Tests unitarios completos
- **IA-Ready**: ✅ Interface clara y validación

```javascript
// Ejemplo de uso
const UserService = require('./components/services/UserService/logic');
const userService = new UserService();
const user = await userService.createUser(userData);
```

## 🤖 Desarrollo con IA

### ⭐ IMPORTANTE: Contexto para IA
Antes de modificar cualquier componente, las IAs deben:

1. **Leer** `metadata/ai-context.json` - Contiene las reglas del proyecto
2. **Ejecutar** `npm run ai:analyze NombreComponente` - Analizar impacto
3. **Seguir** la estructura de componentes atómicos
4. **Validar** con `npm run ai:validate NombreComponente`

### Reglas para IA
```json
// metadata/ai-context.json contiene reglas como:
{
  "aiInstructions": {
    "beforeAnyChange": [
      "Leer metadata/component-map.json para entender dependencias",
      "Ejecutar 'npm run ai:analyze' para evaluar impacto",
      "Revisar tests existentes del componente a modificar"
    ],
    "duringDevelopment": [
      "Seguir estructura atomic component system",
      "Mantener aislamiento entre componentes",
      "Actualizar interface.json si cambias inputs/outputs"
    ]
  }
}
```

### Herramientas Disponibles para IA
- **AIHelper**: `ai-tools/ai-helper.js` - Información sobre componentes
- **ChangeValidator**: `ai-tools/change-validator.js` - Validación de cambios
- **ImpactAnalyzer**: `ai-tools/impact-analyzer.js` - Análisis de impacto
- **RollbackManager**: `ai-tools/rollback-manager.js` - Rollback automático

## 📊 Testing

### Tests Unitarios (Jest)
```bash
# Ejecutar tests de un componente específico
npm test -- ProductForm

# Ejecutar tests con coverage
npm test -- --coverage

# Ejecutar tests en modo watch
npm test -- --watch
```

### Tests Visuales (Playwright)
```bash
# Tests de regresión visual
npm run test:visual

# Generar capturas en diferentes dispositivos
npm run visual:baseline

# Ver diferencias visuales
npm run visual:report
```

### Estructura de Tests
Cada componente debe tener:
- `tests.js` - Tests unitarios del componente
- `visual-tests.js` - Tests visuales (si aplica)
- `visual-scenarios.json` - Configuración de escenarios visuales

## 🔧 Crear Nuevos Componentes

### Generación Automática
```bash
# Crear componente con estructura completa
npm run generate:component MiComponente forms

# Esto crea automáticamente:
# - component.json (metadatos)
# - interface.json (definición de API)
# - logic.js (implementación)
# - tests.js (tests unitarios)
```

### Estructura de Componente
```javascript
// Cada componente debe seguir esta estructura:
components/categoria/NombreComponente/
├── component.json      # Metadatos y configuración
├── interface.json      # Inputs/outputs explícitos
├── logic.js           # Lógica del componente
├── tests.js           # Tests unitarios
└── visual-tests.js    # Tests visuales (opcional)
```

## 🎨 Características del Sistema

### ✅ Atomic Component System
- Componentes completamente aislados
- Sin dependencias cruzadas
- Comunicación vía eventos
- Tests independientes

### ✅ AI-Specific Tools
- Contexto explícito para IA en JSON
- Herramientas de análisis automático
- Validación antes de cambios
- Sistema de rollback automático

### ✅ Visual Testing
- Tests de regresión visual automáticos
- Capturas en múltiples dispositivos
- Detección de cambios visuales
- Reportes detallados

### ✅ Schema-Driven Development
- Interfaces tipadas y documentadas
- Metadatos explícitos
- Validación automática
- Documentación generada

## 🚀 URLs del Proyecto

- **Repositorio**: https://github.com/webmasterscity/ai-first-architecture-one
- **Servidor de desarrollo**: http://localhost:3000 (después de `npm run dev`)
- **Tests de componentes**: http://localhost:3000/test/components/ProductForm

## 🐛 Troubleshooting

### Problemas Comunes

**Error de permisos:**
```bash
sudo chown -R $USER:$USER .
```

**Tests fallan:**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Playwright no funciona:**
```bash
npx playwright install-deps  # Solo en Linux
npx playwright install
```

### Logs y Debug
```bash
# Debug de tests
npm test -- --verbose

# Debug de Playwright
DEBUG=pw:api npm run test:visual

# Validar arquitectura
npm run validate:architecture
```

## 📈 Métricas del Proyecto

- **Componentes**: 2 ejemplos completos (ProductForm, UserService)
- **Cobertura de tests**: 80%+ requerido
- **Herramientas para IA**: 4 herramientas específicas
- **Scripts npm**: 15+ comandos disponibles
- **Documentación**: Completa con ejemplos

## 🤝 Contribuir

### Para Desarrolladores Humanos
1. Fork del repositorio
2. Crear componente con `npm run generate:component`
3. Escribir tests
4. Ejecutar `npm test` y `npm run test:visual`
5. Crear PR

### Para IAs
1. Leer `metadata/ai-context.json`
2. Usar `npm run ai:analyze` antes de cambios
3. Seguir estructura de componentes atómicos
4. Ejecutar `npm run ai:validate` después de cambios
5. Generar reporte de cambios

## 📄 Licencia

MIT License - Ver [LICENSE](LICENSE) para más detalles.

## 🆘 Soporte

- **Issues**: [GitHub Issues](https://github.com/webmasterscity/ai-first-architecture-one/issues)
- **Documentación**: Ver archivos en `/docs`
- **Ejemplos**: Revisar `ProductForm` y `UserService`

---

**⭐ Nota Importante**: Esta arquitectura está específicamente diseñada para que las IAs puedan programar sin romper el sistema. Todas las herramientas y convenciones están optimizadas para desarrollo con IA.
