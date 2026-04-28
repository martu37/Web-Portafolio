document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const pages = document.querySelectorAll('.page');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target');

            // Actualizar pestañas
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Actualizar páginas
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === target) {
                    page.classList.add('active');
                }
            });

            // Pequeño efecto sonoro o feedback visual extra podría ir aquí
            console.log(`Cambiando a sección: ${target}`);
        });
    });

    // Simulación de escritura para el "terminal" (opcional)
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