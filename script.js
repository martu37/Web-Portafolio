document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const pages = document.querySelectorAll('.page');

    // 1. Diccionario de traducciones EXACTO con las llaves del HTML
    const translations = {
        es: {
            lang_toggle: 'EN',
            cover_subtitle: 'DEVELOPER',
            cover_btn: 'SOBRE MÍ',
            tab_about: 'SOBRE_MI.txt',
            tab_projects: 'PROYECTOS.log',
            tab_contact: 'CONTACTO.sh',
            whoami_title: 'C:\\USUARIO\\ESTUDIANTE> WHOAMI',
            about_greeting: 'Hola, soy Martina',
            about_p1: 'Soy estudiante de programación en la universidad de San Martin (UNSAM), Argentina. Me apasiona resolver problemas y construir herramientas útiles.',
            about_p2: 'Esta carpeta contiene los documentos de mis proyectos personales y académicos.',
            skills_title: 'Habilidades:',
            skill_1: 'JavaScript / TypeScript',
            skill_2: 'HTML5 / CSS3',
            about_skill_langs: 'Python / Java (o tus lenguajes)',
            ls_projects_title: 'C:\\USUARIO\\ESTUDIANTE> LS ./PROYECTOS',
            connect_title: 'C:\\USUARIO\\ESTUDIANTE> CONNECT --INFO',
            contact_p1: 'Si quieres contactarme para colaborar o conocer más sobre mi trabajo, puedes encontrarme en:',
            btn_back: '← Volver a la lista',
            btn_repo: 'Ver Repositorio GitHub',
            btn_video: 'Ver Video Demo'
        },
        en: {
            lang_toggle: 'ES',
            cover_subtitle: 'DEVELOPER',
            cover_btn: 'ABOUT ME',
            tab_about: 'ABOUT_ME.txt',
            tab_projects: 'PROJECTS.log',
            tab_contact: 'CONTACT.sh',
            whoami_title: 'C:\\USER\\STUDENT> WHOAMI',
            about_greeting: 'Hi, I am Martina',
            about_p1: 'I am a university computer science student. I am passionate about solving problems and building useful tools.',
            about_p2: 'This folder contains documents from my personal and academic projects.',
            skills_title: 'Skills:',
            skill_1: 'JavaScript / TypeScript',
            skill_2: 'HTML5 / CSS3',
            about_skill_langs: 'Python / Java (or your languages)',
            ls_projects_title: 'C:\\USER\\STUDENT> LS ./PROJECTS',
            connect_title: 'C:\\USER\\STUDENT> CONNECT --INFO',
            contact_p1: 'If you want to contact me to collaborate or learn more about my work, you can find me at:',
            btn_back: '← Back to list',
            btn_repo: 'View GitHub Repository',
            btn_video: 'View Video Demo'
        }
    };

    // 2. Base de datos de proyectos actualizada para i18n
    const projectsData = [
        {
            id: 'piano-asm',
            title: { es: 'Piano en Assembler', en: 'Assembler Piano' },
            shortDesc: { 
                es: 'Implementación de síntesis de sonido de bajo nivel directamente sobre el hardware.',
                en: 'Low-level sound synthesis implementation directly on the hardware.'
            },
            fullDesc: {
                es: 'Desarrollo de un piano funcional utilizando lenguaje ensamblador. El proyecto se centra en la manipulación directa de registros y el controlador de sonido, demostrando comprensión profunda de la arquitectura computacional y gestión de recursos limitada.',
                en: 'Development of a functional piano using assembly language. The project focuses on direct register manipulation and the sound controller, demonstrating deep understanding of computer architecture and limited resource management.'
            },
            tags: ['Assembler', 'Architecture', 'Low-level'],
            link: 'https://github.com/tu-usuario/piano-asm',
            type: 'repo'
        },
        {
            id: 'juego-wollok',
            title: { es: 'Juego en Wollok', en: 'Game in Wollok' },
            shortDesc: {
                es: 'Aventura interactiva centrada en el paradigma de objetos puro.',
                en: 'Interactive adventure focused on the pure object-oriented paradigm.'
            },
            fullDesc: {
                es: 'Videojuego desarrollado en Wollok, enfocado en polimorfismo, encapsulamiento y delegación. El diseño prioriza la solidez del modelo de dominio sobre la complejidad gráfica.',
                en: 'Video game developed in Wollok, focused on polymorphism, encapsulation, and delegation. The design prioritizes the solidity of the domain model over graphical complexity.'
            },
            tags: ['Wollok', 'OOP', 'Game Design'],
            link: '#', // Link al video demo
            type: 'video'
        },
        {
            id: 'visualizadores-python',
            title: { es: 'Visualizadores en Python', en: 'Python Visualizers' },
            shortDesc: {
                es: 'Algoritmos de procesamiento de datos con representación gráfica en tiempo real.',
                en: 'Data processing algorithms with real-time graphical representation.'
            },
            fullDesc: {
                es: 'Conjunto de herramientas para la visualización de datos complejos. Implementación de algoritmos optimizados para el renderizado de flujos de información, utilizando IA para el procesamiento de patrones específicos.',
                en: 'Tool set for complex data visualization. Implementation of optimized algorithms for rendering information flows, using AI for specific pattern processing.'
            },
            tags: ['Python', 'Data Viz', 'Algorithms'],
            link: 'https://github.com/tu-usuario/python-viz',
            type: 'repo'
        },
        {
            id: 'landing-lodge',
            title: { es: 'Landing Page Lodge', en: 'Lodge Landing Page' },
            shortDesc: {
                es: 'Interfaz web optimizada con enfoque en UX y performance.',
                en: 'Optimized web interface with a focus on UX and performance.'
            },
            fullDesc: {
                es: 'Landing page para un lodge, desarrollada con fundamentos de diseño responsivo y optimización de activos. Uso de IA para la generación de assets visuales y mejora del flujo de conversión.',
                en: 'Landing page for a lodge, developed with responsive design fundamentals and asset optimization. Use of AI for visual asset generation and conversion flow improvement.'
            },
            tags: ['HTML5', 'CSS3', 'UX/UI'],
            link: 'https://github.com/tu-usuario/lodge-landing',
            type: 'repo'
        }
    ];

    // Estado del idioma
    let currentLang = localStorage.getItem('portfolioLang') || 'es';

    // 3. Función para cambiar el idioma de la UI
    const setLanguage = (lang) => {
        currentLang = lang;
        localStorage.setItem('portfolioLang', lang);

        // Sincronizar el estado del checkbox switch
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.checked = (lang === 'en');
        }

        // Actualizar textos estáticos
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Re-renderizar galería y detalle
        renderGallery();
        
        // Resetear vista si hay detalle abierto para evitar inconsistencias
        const detailView = document.getElementById('project-detail');
        if (detailView && detailView.style.display === 'block') {
            detailView.style.display = 'none';
            document.getElementById('projects-gallery').style.display = 'block';
        }
    };

    // Manejador del switch de idioma
    const langToggleInput = document.getElementById('lang-toggle');
    if(langToggleInput) {
        langToggleInput.addEventListener('change', (e) => {
            const newLang = e.target.checked ? 'en' : 'es';
            setLanguage(newLang);
            
            // Si hay una página activa, re-ejecutar máquina de escribir
            const activePage = document.querySelector('.page.active');
            if (activePage) {
                const typewriter = activePage.querySelector('.typewriter');
                if (typewriter) runTypewriterForElement(typewriter);
            }
        });
    }

    // Función para renderizar la galería
    const renderGallery = () => {
        const grid = document.querySelector('.project-grid');
        if (!grid) return;

        grid.innerHTML = projectsData.map(p => `
            <div class="project-card" data-id="${p.id}">
                <div class="project-img-placeholder"></div>
                <h3>${p.title[currentLang]}</h3>
                <p>${p.shortDesc[currentLang]}</p>
                <div class="tags">
                    ${p.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => showProjectDetail(card.dataset.id));
        });
    };

    const showProjectDetail = (id) => {
        const project = projectsData.find(p => p.id === id);
        const gallery = document.getElementById('projects-gallery');
        const detail = document.getElementById('project-detail');
        const content = document.getElementById('detail-content');

        const btnText = project.type === 'repo' ? translations[currentLang].btn_repo : translations[currentLang].btn_video;
        const backText = translations[currentLang].btn_back;

        content.innerHTML = `
            <button class="back-btn">${backText}</button>
            <div class="paper detail-paper">
                <h2>${project.title[currentLang]}</h2>
                <div class="tags">${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
                <p class="description">${project.fullDesc[currentLang]}</p>
                <div class="links">
                    <a href="${project.link}" target="_blank" class="action-btn">
                        ${btnText}
                    </a>
                </div>
            </div>
        `;

        gallery.style.display = 'none';
        detail.style.display = 'block';

        content.querySelector('.back-btn').addEventListener('click', () => {
            detail.style.display = 'none';
            gallery.style.display = 'block';
        });
    };

    // Navegación de pestañas
    const folder = document.querySelector('.folder');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target');
            
            // Si la carpeta estaba cerrada, la abrimos
            if (!folder.classList.contains('is-open')) {
                folder.classList.add('is-open');
            }

            // Gestión de clases active en tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Cambio de página con un pequeño delay para que combine con la animación del papel
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === target) {
                    page.classList.add('active');
                    // Ejecutar typewriter específicamente para la página activa
                    const typewriter = page.querySelector('.typewriter');
                    if (typewriter) runTypewriterForElement(typewriter);
                }
            });
            
            if (target === 'projects') {
                document.getElementById('project-detail').style.display = 'none';
                document.getElementById('projects-gallery').style.display = 'block';
            }
        });
    });

    // Efecto máquina de escribir mejorado para elementos individuales
    const runTypewriterForElement = (el) => {
        const text = el.getAttribute('data-text') || el.textContent;
        // Guardamos el texto original si no existe para poder re-ejecutarlo
        if (!el.getAttribute('data-text')) el.setAttribute('data-text', text);
        
        el.textContent = '';
        let i = 0;
        const type = () => {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(type, 30);
            }
        };
        type();
    };

    // Manejador del botón de la portada
    const openBtn = document.getElementById('open-folder-btn');
    if (openBtn) {
        openBtn.addEventListener('click', () => {
            const aboutTab = document.querySelector('[data-target="about"]');
            if (aboutTab) aboutTab.click();
        });
    }

    // Inicializar (empezar cerrado si se desea, o abrir la primera)
    setLanguage(currentLang);
    // Si quieres que empiece CERRADO, no actives ninguna pestaña aquí.
    // Si quieres que empiece ABIERTO en SOBRE MI, descomenta estas líneas:
    // const defaultTab = document.querySelector('[data-target="about"]');
    // if(defaultTab) defaultTab.click();
});