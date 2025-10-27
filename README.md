# ATTKIA AI COMMERCE - Sitio Web Pitch 🤖

Sitio web profesional tipo pitch para presentar ATTKIA AI COMMERCE ante jurados e inversores.

## 🚀 Características

- ✨ **10 secciones optimizadas** para presentación impactante
- 📱 **Diseño responsive** (mobile-first)
- 🎨 **Animaciones suaves** y profesionales
- 🎯 **Navegación intuitiva** con puntos laterales
- ⚡ **Carga rápida** y optimizada con Vite
- 🎭 **Efectos visuales** modernos
- 💬 **Demo interactivo** funcional del chatbot
- 🌐 **Listo para deployment** en Netlify/Vercel

## 📁 Estructura del Proyecto

```
AttKia/
├── index.html          # Página principal con todas las secciones
├── styles.css          # Estilos modernos y responsive
├── script.js           # Animaciones e interactividad
├── images/             # Carpeta para imágenes
│   ├── atter.png      # Foto de Atter Mayer Basilio Rengifo
│   └── kiara.png      # Foto de Shirley Kiara Meléndez Calixto
└── README.md           # Este archivo
```

## 🎯 Secciones del Sitio

1. **HERO** - Introducción impactante con el problema principal
2. **PROBLEMA** - Tres problemas clave que enfrentan las MYPES
3. **SOLUCIÓN** - Demo del chatbot en acción
4. **MERCADO** - Tamaño del mercado y oportunidad
5. **POR QUÉ AHORA** - Urgencia y timing del mercado
6. **DIFERENCIACIÓN** - Tabla comparativa con competidores
7. **MODELO DE NEGOCIO** - Flujo y planes de precio
8. **MÉTRICAS** - Dashboard con tracción y KPIs
9. **EQUIPO** - Perfiles de los fundadores
10. **ROADMAP** - Línea de tiempo y call to action

## 🎨 Paleta de Colores

- **Azul Corporativo**: `#0066FF`
- **Verde Acento**: `#00D9A3`
- **Negro Oscuro**: `#1a1a1a`
- **Blanco**: `#ffffff`
- **Rojo Urgencia**: `#FF4757`
- **Gris**: `#666666`

## 🖼️ Imágenes Requeridas

Para que el sitio funcione perfectamente, necesitas agregar las siguientes imágenes en la carpeta `images/`:

1. **atter.png** - Foto profesional de Atter Mayer Basilio Rengifo (CEO)
2. **kiara.png** - Foto profesional de Shirley Kiara Meléndez Calixto (CMO)

**Recomendaciones para las fotos:**
- Resolución mínima: 600x600px
- Formato: PNG o JPG
- Fondo neutro o profesional
- Foto de busto o cuerpo completo
- Buena iluminación

## 🚀 Cómo Usar Localmente

### Opción 1: Con Vite (RECOMENDADO)

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar servidor de desarrollo
npm run dev

# 3. Abrir en navegador: http://localhost:3000
```

### Opción 2: Build para producción

```bash
# Crear build optimizado
npm run build

# Vista previa del build
npm run preview
```

### Opción 3: Abrir directamente
1. Abre el archivo `index.html` en cualquier navegador moderno
2. Navega usando:
   - **Scroll del mouse** - desplazamiento entre secciones
   - **Puntos laterales** - navegación rápida
   - **Teclado** - flechas arriba/abajo
   - **Touch** - swipe en dispositivos móviles
   - **Botón "Probar Demo"** - chatbot interactivo

## 🎭 Características Interactivas

### Animaciones
- Transiciones suaves entre secciones
- Animación de mensajes en el chat
- Contador regresivo de 60 segundos
- Gráfico de métricas animado
- Puntos animados en el mapa de Perú
- Phone mockup con WhatsApp simulado
- Notificaciones flotantes animadas

### Navegación
- **Scroll automático** entre secciones
- **Navegación lateral** con indicadores
- **Responsive** - adaptado para móviles y tablets
- **Teclado friendly** - usa flechas para navegar

### Demo Interactivo 🤖
- **Chatbot funcional** con IA simulada
- **Palabras clave reconocidas**:
  - "Hola" → Saludo de bienvenida
  - "Quiero hacer un pedido" → Muestra menú
  - "Pizza" → Proceso de pedido
  - "Sí/Confirmo" → Confirmación
  - "Gracias" → Cierre de conversación
- **Botones de sugerencias** para facilitar la interacción
- **Respuestas en tiempo real**

### Easter Eggs 🥚
- Haz clic 5 veces en el logo ATTKIA para un efecto sorpresa
- Revisa la consola del navegador para un mensaje especial

## 📱 Compatibilidad

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Dispositivos móviles iOS/Android

## 🎯 Optimizaciones

- CSS optimizado con variables personalizadas
- Animaciones con GPU acceleration
- Lazy loading de secciones
- Intersection Observer para mejor rendimiento
- Responsive images con fallbacks

## 🔧 Personalización

### Cambiar Colores
Edita las variables CSS en `styles.css`:
```css
:root {
    --color-primary: #0066FF;
    --color-secondary: #00D9A3;
    /* ... más variables */
}
```

### Modificar Contenido
Todo el contenido está en `index.html` - busca la sección que quieras modificar por su ID:
- `#hero`
- `#problema`
- `#solucion`
- etc.

### Ajustar Animaciones
Las animaciones están en `script.js` - puedes modificar duraciones y efectos en la función `animateSection()`.

## 📊 Métricas Actuales (Simuladas)

- 1,247 pedidos procesados
- 12 segundos de tiempo de respuesta
- 4.8/5 satisfacción del cliente
- 92% tasa de conversión

**Nota**: Actualiza estas métricas en el HTML cuando tengas datos reales.

## 💡 Consejos para la Presentación

1. **Practica la navegación** antes de presentar
2. **Usa modo pantalla completa** (F11) para mayor impacto
3. **Prepara las fotos del equipo** con buena calidad
4. **Prueba en diferentes navegadores** antes del día
5. **Ten un backup en PDF** por si hay problemas técnicos
6. **Memoriza los puntos clave** de cada sección

## 🌐 Deployment en la Web

### Netlify (Recomendado)

1. **Subir a GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin [tu-repo-url]
git push -u origin main
```

2. **Deploy en Netlify**:
   - Ve a [netlify.com](https://netlify.com)
   - Click en "New site from Git"
   - Conecta tu repositorio
   - Configuración automática con `netlify.toml`
   - ¡Deploy automático! 🎉

### Vercel

1. **Deploy con Vercel CLI**:
```bash
npm install -g vercel
vercel
```

2. **O desde GitHub**:
   - Ve a [vercel.com](https://vercel.com)
   - "Import Project"
   - Conecta tu repo
   - Configuración automática con `vercel.json`

### GitHub Pages

```bash
# Build del proyecto
npm run build

# Deploy a GitHub Pages
npm install -g gh-pages
gh-pages -d dist
```

## 🐛 Solución de Problemas

### Las imágenes del equipo no aparecen
- Verifica que `atter.png` y `kiara.png` estén en la carpeta `images/`
- Revisa que los nombres sean exactos (case-sensitive)
- Las fotos se muestran completas con `object-fit: contain`
- Si no tienes las fotos, usa las placeholders que se mostrarán automáticamente

### Las animaciones no funcionan
- Asegúrate de tener JavaScript habilitado
- Prueba en un navegador actualizado (Chrome/Firefox/Safari)
- Abre la consola (F12) para ver si hay errores

### El demo no responde
- Verifica que el JavaScript esté cargando correctamente
- Abre la consola para ver errores
- Prueba con las palabras clave exactas: "hola", "quiero hacer un pedido", "gracias"

### Error al hacer npm install
- Asegúrate de tener Node.js 16+ instalado
- Si hay problemas con dependencias, usa: `npm install --legacy-peer-deps`

### El scroll no funciona suavemente
- Algunos navegadores antiguos no soportan `scroll-behavior: smooth`
- Usa Chrome, Firefox o Safari actualizados

## 📞 Contacto

**ATTKIA AI COMMERCE**
- Email: info@attkia.com (ejemplo)
- Web: www.attkia.com (ejemplo)

---

## 👥 Equipo

### Atter Mayer Basilio Rengifo - CEO
Ingeniero de Software con IA | 4 años de experiencia
- Full Stack Development
- Inteligencia Artificial
- Aplicativos web y móviles

### Shirley Kiara Meléndez Calixto - CMO
Marketing & Frontend | Estudiante UNHEVAL
- Marketing Digital
- Frontend Development
- Ganadora STEAM+H Semilleros de Innovación

---

## 📄 Licencia

© 2025 ATTKIA AI COMMERCE. Todos los derechos reservados.

---

**🤖 Trabaja menos, vende más.**

*Sitio web creado para impresionar a jurados e inversores con tecnología y diseño de primera clase.*

