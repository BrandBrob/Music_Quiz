const music = document.querySelector(".audio");
const pauseTime = [34, 49, 68
]; // tiempos en segundos
let currentPauseIndex = 0; // Índice del tiempo de pausa actual
let round = 0;
let points = 0;

//Añade Puntos
const addPoints = () => {
    let selectedInputs =0; // Variable para contar los inputs seleccionados
    const inputs = document.querySelectorAll(".form__input");
    inputs.forEach(inp => {
        inp.addEventListener("click", () => {
            if (selectedInputs < 3) { // Verificar si aún se pueden seleccionar más inputs
                if (inp.classList.contains("click") && inp.classList.contains("correct")) {
                    points++;
                    inp.disabled = true;
                    selectedInputs++; // Incrementar el contador de inputs seleccionados
                } else if (!inp.classList.contains("correct")) {
                    inp.disabled = true;
                    selectedInputs++; // Incrementar el contador de inputs seleccionados
                }
            }
        });
    });
};






//Play a la musica para el cliente, para que no controle la cancion
 const playButton = document.getElementById("playButton");
 playButton.addEventListener("click",()=>{
     music.play();
     inputs.classList.remove("wrong")
 })


// Función para verificar el tiempo y manejar las pausas de la música
const checkTime = () => {
    if (currentPauseIndex < pauseTime.length && music.currentTime >= pauseTime[currentPauseIndex]) {
        music.pause();
        // Mostrar la pregunta y muestra el valor de los inputs
        showInputs();

        // Mostrar la letra de la canción
        music.addEventListener("play", () => {
            removeAnswer();
        });
        showLyric(lyric[currentPauseIndex]);
        currentPauseIndex++; // Pasar al siguiente tiempo de pausa
        round++;
        final();
        
        console.log(round);
        final();
    } else {
        requestAnimationFrame(checkTime);
    }
};

// Función para mostrar los inputs
const showInputs = () => {
    const ps1 = document.querySelectorAll(".form__quest.type-1");
    const ps2 = document.querySelectorAll(".form__quest.type-2");
    const ps3 = document.querySelectorAll(".form__quest.type-3");

    // Función para habilitar la selección en una fila
    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    
    const enableSelection = (inputs, answers) => {
        const shuffledAnswers = shuffle([...answers]); // Crea una copia de las respuestas y barajarlas
        const correctAnswer = answers[0]; // El primer elemento del array de respuestas es el correcto
        let selected = false;
    
        inputs.forEach((input, inputIndex) => {
            input.classList.remove("correct", "wrong");
            input.value = shuffledAnswers[inputIndex];
    
            if (shuffledAnswers[inputIndex] === correctAnswer) {
                input.classList.add("correct");
            } else {
                input.classList.add("wrong");
            }
    
            input.disabled = false;
            input.addEventListener("click", () => {
                if (!selected) {
                    if (input.classList.contains("correct")) {
                        points++;
                    }
                    inputs.forEach(inp => inp.disabled = true);
                    selected = true;
                }
            });
        });
    };
    

    const lyrics = [lyrics1, lyrics2, lyrics3];
    const answers = [answer1, answer2, answer3];

    ps1.forEach((p, index) => {
        p.innerHTML = lyrics1[round];
        p.classList.remove("dis");
        enableSelection(p.parentNode.querySelectorAll(".form__input"), answers[round % answers.length][0]);
    });

    ps2.forEach((p2, index) => {
        p2.innerHTML = lyrics2[round];
        p2.classList.remove("dis");
        enableSelection(p2.parentNode.querySelectorAll(".form__input"), answers[round % answers.length][1]);
    });

    ps3.forEach((p3, index) => {
        p3.innerHTML = lyrics3[round];
        p3.classList.remove("dis");
        enableSelection(p3.parentNode.querySelectorAll(".form__input"), answers[round % answers.length][2]);
    });
};


const removeAnswer = () => {
    const inputs = document.querySelectorAll(".form__input");
    inputs.forEach(input => {
        input.value = "Opción";
        input.classList.remove("correct");
        input.classList.remove("wrong")
        input.disabled = false;
    });
};

// Función para manejar el evento 'play' de la música
const handlePlay = () => {
    // Ocultar los inputs cuando se reproduce la música
    hideInputs();
    // Iniciar la verificación del tiempo
    requestAnimationFrame(checkTime);
};

// Función para ocultar los inputs
const hideInputs = () => {
    const ps = document.querySelectorAll(".form__quest");
    ps.forEach(p => {
        p.classList.add("dis");
    });
};

// Agregar oyentes de eventos
music.addEventListener("play", handlePlay);

music.addEventListener("pause", () => {
    if (currentPauseIndex < pauseTime.length) {
        // Configurar para reanudar la verificación cuando se reproduzca de nuevo
        music.addEventListener("play", handlePlay, { once: true });
    }
});

// Función para mostrar la letra de la canción
function showLyric(lyric) {
    const aside = document.querySelector(".aside__container");
    const p = document.createElement("p");
    p.textContent = lyric;
    p.classList.add("lyric");
    aside.appendChild(p);
}

// Eliminar la letra actual cuando se reanuda la reproducción de la música
music.addEventListener("play", () => {
    const aside = document.querySelector(".aside__container");
    const existingLyric = aside.querySelector(".lyric");
    if (existingLyric) {
        existingLyric.remove();
    }
});

music.addEventListener("play", () => {
    const h4points = document.getElementById("points");
    h4points.innerHTML = points;
});

const final = ()=>{
if(round === 3){
music.addEventListener("play",()=>{
    const playButton = document.getElementById("playButton");
    const maincontainer = document.querySelector(".main-container") 
    maincontainer.remove();
    playButton.remove()
    music.pause();

    const points = document.querySelector(".div-points")
    points.classList.add("doit")
    points.classList.add("shadow")
    const reload = document.createElement("button")
    reload.addEventListener("click",()=>{
        location.reload
    })
    const field = document.querySelector(".div-points")
    field.appendChild(reload)
})
}
}