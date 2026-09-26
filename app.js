const significados = {
            1: "El Líder: Representa independencia, originalidad y confianza. Eres una persona pionera, ambiciosa y con fuerte individualidad. Tienes habilidades de liderazgo y te gusta iniciar nuevos proyectos. Tu desafío es equilibrar tu independencia con la cooperación.",
            2: "El Mediador: Simboliza cooperación, diplomacia y sensibilidad. Eres paciente, adaptable y tienes grandes habilidades para trabajar en equipo. Tu intuición es fuerte y eres excelente para mediar conflictos. Tu reto es desarrollar confianza en ti mismo y evitar la indecisión.",
            3: "El Comunicador: Representa creatividad, expresión y optimismo. Eres sociable, carismático y tienes talento artístico. Tu entusiasmo es contagioso y tienes facilidad para inspirar a otros. Tu desafío es mantener el enfoque y la disciplina en tus proyectos.",
            4: "El Constructor: Simboliza estabilidad, practicidad y confiabilidad. Eres trabajador, organizado y te caracterizas por tu honestidad. Tienes habilidad para construir bases sólidas en cualquier proyecto. Tu reto es encontrar flexibilidad y no ser demasiado rígido.",
            5: "El Aventurero: Representa libertad, cambio y versatilidad. Eres adaptable, curioso y amas la aventura. Tienes una mente ágil y aprendes rápidamente. Tu desafío es encontrar un equilibrio entre tu deseo de libertad y la necesidad de estabilidad.",
            6: "El Nutridor: Simboliza responsabilidad, armonía y amor. Eres compasivo, protector y te preocupas genuinamente por los demás. Tienes un fuerte sentido de la justicia y la belleza. Tu reto es no cargar con demasiadas responsabilidades y aprender a cuidar de ti mismo.",
            7: "El Místico: Representa análisis, sabiduría y espiritualidad. Eres intelectual, introspectivo y buscas constantemente el conocimiento profundo. Tienes una mente analítica y te atraen los misterios de la vida. Tu desafío es equilibrar tu vida interior con el mundo exterior.",
            8: "El Ejecutivo: Simboliza poder, abundancia y autoridad. Eres ambicioso, eficiente y tienes grandes habilidades para los negocios y la gestión. Tienes la capacidad de lograr grandes metas materiales. Tu reto es usar tu poder de manera ética y equilibrada.",
            9: "El Humanitario: Representa compasión, idealismo y sabiduría universal. Eres generoso, tolerante y tienes una perspectiva global. Tu misión es servir a la humanidad de alguna manera. Tu desafío es aprender a poner límites y no sacrificarte demasiado por otros.",
            11: "El Iluminado: Número maestro que representa intuición elevada, inspiración y liderazgo espiritual. Tienes un gran potencial para elevar la conciencia de otros. Tu desafío es manejar la alta sensibilidad y las expectativas que conlleva este número.",
            22: "El Constructor Maestro: Número maestro que simboliza la capacidad de manifestar grandes ideas en el mundo material. Tienes el potencial de lograr cosas extraordinarias que beneficien a muchos. Tu reto es no sucumbir ante la presión de este gran potencial.",
            33: "El Maestro Instructor: El más raro de los números maestros, representa compasión y enseñanza a nivel global. Tienes un potencial único para elevar la conciencia de la humanidad a través del amor y la sabiduría. Tu desafío es vivir a la altura de este alto ideal sin agotarte."
        };

function analizarNombre(nombre) {
    const letras = nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/[^A-Z]/g, '');
    if (!letras) return null;
    const valores = [...letras].map(letra => ((letra.charCodeAt(0) - 65) % 9) + 1);
    let numero = valores.reduce((total, valor) => total + valor, 0);
    const pasos = [numero];
    while (numero > 9 && ![11, 22, 33].includes(numero)) {
        numero = [...String(numero)].reduce((total, cifra) => total + Number(cifra), 0);
        pasos.push(numero);
    }
    return { numero, pasos, letras, valores };
}

const form = document.getElementById('name-form');
const input = document.getElementById('nombreInput');
form.addEventListener('submit', event => {
    event.preventDefault();
    const resultado = analizarNombre(input.value);
    const error = document.getElementById('form-error');
    if (!resultado) {
        error.textContent = 'Escribe un nombre con letras para descubrir tu número.';
        input.setAttribute('aria-invalid', 'true');
        input.focus();
        return;
    }
    error.textContent = '';
    input.removeAttribute('aria-invalid');
    document.getElementById('result-empty').hidden = true;
    document.getElementById('result-content').hidden = false;
    document.getElementById('valorNumerico').textContent = resultado.numero;
    const [titulo, ...descripcion] = significados[resultado.numero].split(':');
    document.getElementById('result-title').textContent = titulo;
    document.getElementById('significado').textContent = descripcion.join(':').trim();
    document.getElementById('result-name').textContent = input.value.trim();
    document.getElementById('result-type').textContent = [11, 22, 33].includes(resultado.numero) ? 'NÚMERO MAESTRO' : 'TU NÚMERO DE EXPRESIÓN';
    document.getElementById('calculation').textContent = resultado.valores.join(' + ') + ' = ' + resultado.pasos.join(' → ');
    document.getElementById('result-content').focus({ preventScroll: true });
});
input.addEventListener('input', () => {
    input.removeAttribute('aria-invalid');
    document.getElementById('form-error').textContent = '';
});
