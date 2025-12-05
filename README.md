# 🌊 Depofibra - Web Corporativa (Diseño Minimalista)

Este repositorio contiene el código fuente para el sitio web corporativo de **Depofibra**, diseñado con una estética **"Nordic Minimalist"** y **"Clean eCommerce"**. El proyecto se centra en la elegancia, la limpieza visual y la experiencia de usuario premium para la venta de depósitos y piscinas de poliéster.

![Estado del Proyecto](https://img.shields.io/badge/Estado-Terminado-success)
![Licencia](https://img.shields.io/badge/Licencia-Privada-blue)

## 🎨 Características de Diseño

El diseño se inspira en plantillas de alta gama (*Anton, Xton, Viasun*) y cuenta con:

* **Estilo Visual:** Minimalismo nórdico, mucho espacio en blanco y tipografía geométrica (*Jost*).
* **Navegación "Glass":** Barra de menú transparente que se vuelve blanca y sólida con efecto *blur* al hacer scroll.
* **Hero Slider Inmersivo:** Cabecera a pantalla completa con efecto de zoom lento (*Ken Burns effect*).
* **Interacciones Sutiles:**
    * Botones con subrayado animado.
    * Efectos *hover* en productos (Zoom + Overlay oscuro).
    * Botones de "Vista Rápida" flotantes.
* **Animaciones:** Aparición suave de elementos al hacer scroll usando la librería **AOS**.
* **Marquee Infinito:** Cinta de texto en movimiento para destacar valores de marca de forma elegante.

## 🛠️ Tecnologías Utilizadas

* **HTML5 Semántico:** Estructura limpia y optimizada para SEO.
* **CSS3 Moderno:** Uso de variables CSS (`:root`) para fácil personalización.
* **Bootstrap 5.3:** Framework base para la rejilla (grid) y responsividad móvil.
* **JavaScript (ES6):** Lógica ligera para el menú y configuraciones.
* **Librerías Externas:**
    * [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/) - Para animaciones de entrada.
    * [Font Awesome 6](https://fontawesome.com/) - Para iconografía.
    * [Google Fonts](https://fonts.google.com/) - Tipografía principal: **'Jost'**.

## 📂 Estructura del Proyecto

```text
depofibra_web/
│
├── index.html        # Archivo principal (Estructura y contenido)
├── css/
│   └── style.css     # Estilos personalizados, variables de color y efectos
├── js/
│   └── script.js     # Inicialización de AOS y lógica del menú scroll
└── img/
    ├── (Las imágenes se cargan actualmente desde Unsplash como placeholders)
    └── ...
