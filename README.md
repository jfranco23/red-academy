# RED ACADEMY — Real Estate Developer Academy

> **redevacademy.com** · Jorge Franco · CEO, Grupo Franco Carrera S.A. · Bocas del Toro, Panamá

Plataforma de educación en desarrollo inmobiliario para LATAM. Todos los archivos son HTML autocontenidos — sin frameworks, sin dependencias locales, listo para GitHub Pages o Netlify.

---

## Estructura del repositorio

```
redevacademy/
│
├── index.html                      → Home / Landing page principal
├── catalogo.html                   → Catálogo de productos (6 ítems + bundle)
├── redm.html                       → Sales page Curso REDM ($2,000)
├── portal.html                     → Portal de estudiantes (login: mario@email.com / Bienvenido123)
├── admin.html                      → Panel de administración (login: admin@redacademy.com / admin123)
│
├── producto-factibilidad.html      → Ebook 01: Análisis de Factibilidad ($47)
├── producto-presupuesto.html       → Ebook 02: Presupuesto de Construcción ($39)
├── producto-financiamiento.html    → Ebook 03: Financiamiento Bancario ($49)
├── producto-str.html               → Ebook 04: Modelo Financiero STR ($55)
├── producto-contratos.html         → Pack de Contratos ($69)
│
└── simuladores/
    ├── factibilidad.html           → RED Feasibility Simulator (ROI, TIR, VPN, sensibilidad)
    ├── presupuesto.html            → RED Budget Simulator (14 capítulos, 120+ ítems)
    ├── financiamiento.html         → RED Finance Simulator (crédito constructor + hipotecas 10 bancos)
    ├── str.html                    → RED STR Simulator (modelo de renta corta)
    └── lab-factibilidad.html       → Lab interactivo Capítulo 1
```

---

## Deploy rápido en Netlify

1. Sube este repositorio a GitHub
2. Ve a [netlify.com](https://netlify.com) → New site from Git
3. Selecciona el repositorio → Branch: `main`
4. Build command: *(dejar vacío)*
5. Publish directory: `/` *(raíz del repo)*
6. Deploy site

El sitio queda en línea en segundos. Luego conecta tu dominio `redevacademy.com` en Netlify → Domain settings.

## Deploy en GitHub Pages

1. Ve a Settings → Pages
2. Source: `Deploy from a branch`
3. Branch: `main` / `/ (root)`
4. El sitio queda disponible en `https://tuusuario.github.io/redevacademy/`

---

## Tecnologías

- HTML5 puro — sin React, sin Vue, sin dependencias locales
- CSS: variables personalizadas, diseño responsivo
- JS: vanilla ES6+
- Fuentes: Google Fonts (Cormorant Garamond + Outfit) — CDN
- Charts: Chart.js 4.4 — CDN
- Íconos: emojis nativos

---

## Paleta de colores (tema light — WhatsApp/Gmail style)

| Variable | Color | Uso |
|----------|-------|-----|
| `--gold` | `#9B7A45` | Acento principal RED ACADEMY |
| `--bg` | `#FFFFFF` | Fondo principal |
| `--bg2` | `#F8F9FA` | Paneles secundarios |
| `--bg3` | `#F0F2F5` | Cards y campos |
| `--text` | `#111B21` | Texto principal |
| `--muted` | `#5F6368` | Texto secundario |
| `--green` | `#1E8E3E` | GO / Viable |
| `--red` | `#D93025` | NO-GO / Alerta |
| `--blue` | `#1A73E8` | Acción / Selección |

---

## Simuladores — Credenciales y funcionalidades

### Portal de Estudiantes (`portal.html`)
- **Login:** mario@email.com / Bienvenido123
- Curriculum completo con 8 módulos
- Tab de Laboratorios con los 5 simuladores integrados
- Progress tracker por lección

### Panel Admin (`admin.html`)
- **Login:** admin@redacademy.com / admin123
- Gestión de cursos, lecciones tipo video o laboratorio
- Dropdown para seleccionar simulador por lección

### RED Feasibility Simulator (`simuladores/factibilidad.html`)
- 4 tabs: Terreno, Proyecto, Costos, Ingresos
- ROI, TIR, VPN en tiempo real
- 3 escenarios (pesimista/base/optimista)
- Matriz de sensibilidad precio × costo
- Recomendación GO/NO-GO automática

### RED Budget Simulator (`simuladores/presupuesto.html`)
- 14 capítulos de obra, 120+ ítems
- Benchmarks Panamá en 4 niveles de calidad
- Alertas de capítulos incompletos
- Gráfico de distribución en tiempo real

### RED Finance Simulator (`simuladores/financiamiento.html`)
- TAB 1: Crédito constructor para desarrolladores
  - Cronograma de desembolsos por avance de obra
  - Intereses en curso mes a mes
- TAB 2: Hipoteca para compradores
  - 10 bancos de Panamá con tasas reales Q4 2025
  - Ley de Interés Preferencial automática
  - FECI para compradores extranjeros
  - Tabla comparativa + amortización

---

## Contacto

**Jorge Franco** — CEO, Grupo Franco Carrera S.A.  
Bocas del Toro, Panamá  
Instagram: [@jorgefrancoca](https://instagram.com/jorgefrancoca)  
RED ACADEMY: [redevacademy.com](https://redevacademy.com)

---

*© 2025 RED ACADEMY — Real Estate Developer Academy. Todos los derechos reservados.*
