const typingSound = new Audio('sounds/typewriting.wav');
const unfoldSound = new Audio('sounds/unfold.wav');
const paperSound = new Audio('sounds/paper.wav');
const popSound = new Audio('sounds/pop.mp3');

var seal = document.getElementById("seal");
var top_letter = document.getElementById("top");
var base = document.getElementById("base");
var letter = document.getElementById("letter");
const textEl = document.getElementById('letter-text');

const message = "Dear friend,\n" +
"If you are receiving this it means you are a very special person to me. " + 
"Remember, love isn’t only for couples. " +
"Today is a day to celebrate the people we care about and who care about us in our lives. " +
"I’m so grateful for you, and I hope you’re happy today and always. " +
"\nε(´｡•᎑•`)っ 💕"+
"\n\nHappy Valentine’s Day!\n\n✧˖° With love Alissea ♡";

function typeWriterWithSound(text, element, delay = 50) {
    let i = 0;
    element.textContent = "";

    // Configurar sonido en bucle
    typingSound.loop = true;
    typingSound.play();

    const interval = setInterval(() => {
        element.textContent += text[i];
        i++;

        if (i >= text.length) {
            clearInterval(interval);
            // Detener sonido al terminar
            typingSound.pause();
            typingSound.currentTime = 0;
        }
    }, delay);
}
seal.addEventListener('click', () =>{

    if(!seal.classList.contains("up")){
        // Añadir la clase que hace volar
        seal.classList.add('open');
        popSound.play();
        seal.style.pointerEvents = "none";
        setTimeout(()=>
        {
            seal.classList.remove('open');
        }, 500);
        setTimeout(()=>
        {   
            seal.classList.add('up');
            top_letter.classList.add('open');
        }, 600);
        
        setTimeout(()=>
        {
            paperSound.play();
            base.classList.add("open");
            letter.classList.add("show");
        }, 1300);

        setTimeout(()=>
        {
            letter.classList.add("front");
        }, 1800);

        setTimeout(()=>
        {
            letter.classList.remove("show");
            
            seal.style.pointerEvents = "auto";
        }, 2300);
    }
    else{
        // Animación inversa (cerrar)
        seal.classList.add("close");
        popSound.play();
        seal.style.pointerEvents = "none";
        setTimeout(()=>
        {
            paperSound.play();
            seal.classList.remove('close');
            letter.classList.add("unshow");
        }, 500);
        setTimeout(()=>
        {
            
            letter.classList.remove("front");
        }, 1000);
        setTimeout(()=>
        {
            letter.classList.remove("unshow");
            base.classList.remove("open");
        }, 1500);
        setTimeout(()=>
        {
            top_letter.classList.remove('open');
            seal.classList.remove("up");
            top_letter.classList.add('down');
        }, 2000);
        setTimeout(()=>
        {
            top_letter.classList.remove('down');
            seal.style.pointerEvents = "auto";
        }, 2700);


    }

})

letter.addEventListener('click', () => {
    letter.classList.toggle('open');
    unfoldSound.play();
    letter.style.pointerEvents = "none";
    if(letter.classList.contains("open")){
        // Esperar a que termine la animación de desdoble
        letter.addEventListener('transitionend', function handler(e) {
            if (e.propertyName === 'transform') {
                typeWriterWithSound(message, textEl, 50);
                letter.removeEventListener('transitionend', handler);
            }
        });
        setTimeout(()=>{
            letter.style.pointerEvents = "auto";
        },10000);
    }
    else{
        setTimeout(()=>{
            letter.style.pointerEvents = "auto";
        },1000);
    }

    
});

// Función para escribir letra por letra
function typeWriter(text, element, delay = 50) {
    let i = 0;
    element.textContent = ""; // limpia el texto
    const interval = setInterval(() => {
        element.textContent += text[i];
        i++;
        if (i >= text.length) clearInterval(interval);
    }, delay);
}