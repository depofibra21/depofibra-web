document.addEventListener('DOMContentLoaded', function () {

    /* =========================================
       1. FUNCIONES VISUALES (Cursor, AOS, etc)
       ========================================= */
    
    // Cursor Personalizado
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', function (e) {
            const posX = e.clientX;
            const posY = e.clientY;
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });
        const links = document.querySelectorAll('a, button, .btn, .nav-link, .product-item');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            link.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }

    // Animaciones AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, easing: 'ease-out', once: true, offset: 80 });
    }

    // Slider Hero
    var myCarousel = document.querySelector('#hero-slider');
    if (myCarousel && typeof bootstrap !== 'undefined') {
        var carousel = new bootstrap.Carousel(myCarousel, { interval: 5000, ride: 'carousel', pause: false });
        carousel.cycle();
    }

    // Filtros de Productos
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item-dynamic');
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filterValue = this.getAttribute('data-filter');
                productItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    if (filterValue === 'all' || filterValue === itemCategory) {
                        item.classList.remove('d-none');
                        item.classList.add('animate-fade');
                        setTimeout(() => { item.classList.remove('animate-fade'); item.style.opacity = '1'; }, 500);
                    } else { item.classList.add('d-none'); }
                });
                if (typeof AOS !== 'undefined') setTimeout(() => AOS.refresh(), 100);
            });
        });
    }


    /* ========================================================
       2. SISTEMA DE COOKIES RGPD (Aceptar, Rechazar, Config)
       ======================================================== */
    
    // --- CONFIGURACIÓN ---
    const GA_MEASUREMENT_ID = 'G-TU_CODIGO_AQUI'; // <--- ¡PON TU CÓDIGO AQUÍ!

    // Elementos del DOM
    const banner = document.getElementById('cookie-banner');
    const modal = document.getElementById('cookie-modal');
    
    const btnAccept = document.getElementById('btn-accept');
    const btnReject = document.getElementById('btn-reject');
    const btnConfig = document.getElementById('btn-config');
    
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnSavePref = document.getElementById('btn-save-preferences');
    const checkAnalytics = document.getElementById('check-analytics');

    // Función para Cargar Analytics (Solo si se permite)
    function loadAnalytics() {
        if (document.getElementById('ga-script')) return; // Evitar duplicados

        console.log("Depofibra: ✅ Analytics ACTIVADO (Permiso concedido)");

        const script = document.createElement('script');
        script.id = 'ga-script';
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID);
    }

    // --- LÓGICA DE INICIO ---
    // Comprobamos si el usuario ya decidió antes
    const savedConsent = localStorage.getItem('cookieConsent'); 

    if (!savedConsent) {
        // No ha decidido nada -> Mostramos Banner tras 1.5 seg
        setTimeout(() => { 
            if(banner) banner.classList.add('show'); 
        }, 1500);
    } else {
        // Ya decidió -> Comprobamos si dio permiso a Analytics
        const analyticsAllowed = localStorage.getItem('analyticsConsent') === 'true';
        if (savedConsent === 'all' || analyticsAllowed) {
            loadAnalytics();
        } else {
            console.log("Depofibra: ❌ Analytics BLOQUEADO por preferencia del usuario.");
        }
    }

    // --- EVENTOS DE LOS BOTONES ---

    // A) ACEPTAR TODO
    if(btnAccept) {
        btnAccept.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'all');
            localStorage.setItem('analyticsConsent', 'true');
            if(banner) banner.classList.remove('show');
            loadAnalytics();
        });
    }

    // B) RECHAZAR TODO (Solo necesarias)
    if(btnReject) {
        btnReject.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'technical');
            localStorage.setItem('analyticsConsent', 'false');
            if(banner) banner.classList.remove('show');
            console.log("Depofibra: Cookies rechazadas (Solo técnicas activas).");
        });
    }

    // C) ABRIR CONFIGURACIÓN (Modal)
    if(btnConfig) {
        btnConfig.addEventListener('click', () => {
            if(modal) modal.classList.add('open');
        });
    }

    // D) CERRAR MODAL (X)
    if(btnCloseModal) {
        btnCloseModal.addEventListener('click', () => {
            if(modal) modal.classList.remove('open');
        });
    }

    // E) GUARDAR PREFERENCIAS (Desde el modal)
    if(btnSavePref) {
        btnSavePref.addEventListener('click', () => {
            // Miramos si marcó el check de Analytics
            const allowAnalytics = checkAnalytics.checked;
            
            localStorage.setItem('cookieConsent', 'custom');
            localStorage.setItem('analyticsConsent', allowAnalytics ? 'true' : 'false');
            
            // Cerramos todo
            if(modal) modal.classList.remove('open');
            if(banner) banner.classList.remove('show');

            // Aplicamos la decisión
            if (allowAnalytics) loadAnalytics();
            else console.log("Depofibra: Analytics desactivado desde configuración.");
        });
    }

    console.log("Depofibra: Scripts cargados correctamente.");
});