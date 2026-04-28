document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const pages = document.querySelectorAll('.page');

    // Base de datos de proyectos
    const projectsData = [
        {
            id: 'piano-asm',
            title: 'Piano en Assembler',
            shortDesc: 'Implementación de síntesis de sonido de bajo nivel directamente sobre el hardware.',
            fullDesc: 'Desarrollo de un piano funcional utilizando lenguaje ensamblador. El proyecto se centra en la manipulación directa de registros y el controlador de sonido, demostrando comprensión profunda de la arquitectura computacional y gestión de recursos limitada.',
            tags: ['Assembler', 'Arquitectura', 'Low-level'],
            link: 'https://github.com/tu-usuario/piano-asm',
            type: 'repo'
        },
        {
            id: 'juego-wollok',
            title: 'Juego en Wollok',
            shortDesc: 'Aventura interactiva centrada en el paradigma de objetos puro.',
            fullDesc: 'Videojuego desarrollado en Wollok, enfocado en polimorfismo, encapsulamiento y delegación. El diseño prioriza la solidez del modelo de dominio sobre la complejidad gráfica.',
            tags: ['Wollok', 'OOP', 'Game Design'],
            link: '#', // Link al video demo
            type: 'video'
        },
        {
            id: 'visualizadores-python',
            title: 'Visualizadores en Python',
            shortDesc: 'Algoritmos de procesamiento de datos con representación gráfica en tiempo real.',
            fullDesc: 'Conjunto de herramientas para la visualización de datos complejos. Implementación de algoritmos optimizados para el renderizado de flujos de información, utilizando IA para el procesamiento de patrones específicos.',
            tags: ['Python', 'Data Viz', 'Algorithms'],
            link: 'https://github.com/tu-usuario/python-viz',
            type: 'repo'
        },
        {
            id: 'landing-lodge',
            title: 'Landing Page Lodge',
            shortDesc: 'Interfaz web optimizada con enfoque en UX y performance.',
            fullDesc: 'Landing page para un lodge, desarrollada con fundamentos de diseño responsivo y optimización de activos. Uso de IA para la generación de assets visuales y mejora del flujo de conversión.',
            tags: ['HTML5', 'CSS3', 'UX/UI'],
            link: 'https://github.com/tu-usuario/lodge-landing',
            type: 'repo'
        }
    ];

    // Función para renderizar la galería
    const renderGallery = () => {
        const grid = document.querySelector('.project-grid');
        if (!grid) return;

        grid.innerHTML = projectsData.map(p => `
            <div class="project-card" data-id="${p.id}">
                <div class="project-img-placeholder"></div>
                <h3>${p.title}</h3>
                <p>${p.shortDesc}</p>
                <div class="tags">
                    ${p.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');

        // Eventos para las tarjetas
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => showProjectDetail(card.dataset.id));
        });
    };

    const showProjectDetail = (id) => {
        const project = projectsData.find(p => p.id === id);
        const gallery = document.getElementById('projects-gallery');
        const detail = document.getElementById('project-detail');
        const content = document.getElementById('detail-content');

        content.innerHTML = `
            <button class="back-btn">← Volver a la lista</button>
            <div class="paper detail-paper">
                <h2>${project.title}</h2>
                <div class="tags">${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
                <p class="description">${project.fullDesc}</p>
                <div class="links">
                    <a href="${project.link}" target="_blank" class="action-btn">
                        ${project.type === 'repo' ? 'Ver Repositorio GitHub' : 'Ver Video Demo'}
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

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target');
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === target) page.classList.add('active');
            });
            
            // Si volvemos a proyectos, resetear a galería
            if (target === 'projects') {
                document.getElementById('project-detail').style.display = 'none';
                document.getElementById('projects-gallery').style.display = 'block';
            }
        });
    });

    renderGallery();

    const typewriters = document.querySelectorAll('.typewriter');
    typewriters.forEach(el => {
        const text = el.textContent;
        el.textContent = '';
        let i = 0;
        const type = () => {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        };
        type();
    });
});