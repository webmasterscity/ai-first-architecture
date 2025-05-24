# AI-First Software Architecture

Una arquitectura de software diseñada específicamente para que las IAs puedan entender, modificar y escalar fácilmente sin romper el sistema.

## 🎯 Objetivo

Resolver el problema de que las IAs cometan errores o dañen sistemas cuando programan, creando una arquitectura donde todo es explícito, testeable de forma aislada y escalable.

## 🖥️ Compatibilidad

✅ **macOS** 10.15+ (Catalina) con Homebrew  
✅ **Ubuntu** 18.04+ LTS  
✅ **Debian** 10+  
✅ **Linux Mint** 19+  
✅ **Fedora** 32+  
✅ **Arch Linux**  

## 🚀 Instalación Rápida

### Instalación Automática (Recomendada)

**macOS:**
```bash
# Instalar prerrequisitos si no los tienes
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install git

# Ejecutar script de setup
curl -fsSL https://raw.githubusercontent.com/tu-usuario/ai-first-architecture/main/setup-ai-architecture.sh -o setup.sh
chmod +x setup.sh
./setup.sh
```

**Ubuntu/Linux:**
```bash
# Actualizar sistema
sudo apt update

# Ejecutar script de setup
curl -fsSL https://raw.githubusercontent.com/tu-usuario/ai-first-architecture/main/setup-ai-architecture.sh -o setup.sh
chmod +x setup.sh
./setup.sh
```

## 📋 Comandos Principales

```bash
# Desarrollo
npm run dev                    # Inicia el servidor de desarrollo
npm run test                   # Ejecuta todos los tests
npm run test:visual           # Ejecuta tests visuales
npm run test:component        # Tests de componentes

# Herramientas para IA
npm run ai:analyze            # Analiza cambios propuestos
npm run ai:validate           # Valida cambios antes de aplicar
npm run ai:help               # Ayuda para desarrollo con IA

# Visual Testing
npm run visual:baseline       # Genera screenshots de referencia
npm run visual:test           # Ejecuta tests visuales

# Generación de Componentes
npm run generate:component MyComponent forms
```

## 🧩 Crear Componentes

Para crear un nuevo componente:

```bash
npm run generate:component ProductForm forms
npm run generate:component UserService services
npm run generate:component PaymentWorkflow workflows
```

## 🤖 Desarrollo con IA

### Reglas para IAs
1. **Siempre leer** `metadata/ai-context.json` antes de cambios
2. **Ejecutar tests** después de cada modificación
3. **Actualizar metadatos** si cambias interfaces
4. **Usar herramientas** de validación antes de aplicar cambios

### Herramientas Disponibles
- `npm run ai:analyze <component>` - Analizar impacto de cambios
- `npm run ai:validate <component>` - Validar cambios propuestos
- `npm run ai:help` - Ayuda y comandos disponibles

## 📚 Documentación

- [Guía de Desarrollo con IA](docs/ai-development-guide.md)
- [Creación de Componentes](docs/component-creation-guide.md)
- [Guía de Testing](docs/testing-guide.md)

## 📄 Licencia

MIT License - Ver [LICENSE](LICENSE) para más detalles.

---

**Nota**: Esta arquitectura está específicamente diseñada para facilitar el desarrollo con IA, manteniendo la robustez y escalabilidad para desarrolladores humanos en cualquier plataforma.
