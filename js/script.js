document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA DEL CURSOR PERSONALIZADO ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    // Mover el cursor
    window.addEventListener('mousemove', function(e) {
        const posX = e.clientX;
        const posY = e.clientY;

        // El punto se mueve instantáneamente
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // El círculo sigue con una animación suave (retraso)
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Efecto Hover en enlaces (Agrandar círculo)
    const links = document.querySelectorAll('a, button, .btn, .nav-link, .product-item');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        link.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });
    });


    // --- INICIALIZACIÓN AOS (Animaciones) ---
    AOS.init({
        duration: 1000,
        easing: 'ease-out',
        once: true,
        offset: 80
    });

    console.log("Depofibra: Custom Cursor Loaded");

    // (La lógica del navbar scroll ya no es necesaria porque ahora es blanco fijo, 
    // pero la dejamos limpia por si acaso)

    // --- FORZAR INICIO DEL SLIDER ---
    // Esto asegura que el carrusel empiece a moverse sí o sí
    var myCarousel = document.querySelector('#hero-slider');
    if (myCarousel) {
        var carousel = new bootstrap.Carousel(myCarousel, {
            interval: 5000, // 5 segundos
            ride: 'carousel',
            pause: false // No parar si el ratón pasa por encima (opcional)
        });
        carousel.cycle(); // Orden explícita de "EMPIEZA A MOVERTE"
    }

    // --- LÓGICA DE FILTRADO DE PRODUCTOS ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item-dynamic');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); // Evita que la página salte al inicio

            // 1. Gestionar la clase 'active' en los botones
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 2. Obtener la categoría seleccionada
            const filterValue = this.getAttribute('data-filter');

            // 3. Filtrar los productos
            productItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === itemCategory) {
                    // Mostrar producto
                    item.classList.remove('d-none');
                    item.classList.add('animate-fade'); // Añadir animación
                    
                    // Reiniciar animación (truco para que se ejecute siempre)
                    setTimeout(() => {
                        item.classList.remove('animate-fade'); 
                        item.style.opacity = '1';
                    }, 500);
                    
                } else {
                    // Ocultar producto
                    item.classList.add('d-none'); // Clase de Bootstrap para display:none
                }
            });
            
            // Opcional: Refrescar AOS si se usa (aunque d-none suele ser suficiente)
            setTimeout(() => {
                AOS.refresh(); 
            }, 100);
        });
    });
    
    console.log("Depofibra: Product Filter Loaded");
});