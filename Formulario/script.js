document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registroForm');
    const nombreInput = document.getElementById('Nombre');
    const apellidoInput = document.getElementById('Apellido');
    const direccionInput = document.getElementById('Direccion');
    const cedulaInput = document.getElementById('Cedula');
    const contraseñaInput = document.getElementById('contraseña');
    const confirmarContraseñaInput = document.getElementById('confirmarContraseña');
    const emailInput = document.getElementById('email');
    const radioButtons = document.querySelectorAll('input[type="radio"][name="gustos"]');
    const colorInput = document.getElementById('colorInput');



    form.addEventListener('submit', function (event) {
        let valid = true;

        if (nombreInput.value.trim() === '' || nombreInput.value.length > 25) {
            alert('El campo Nombre debe estar lleno y tener una longitud máxima de 25 caracteres.');
            valid = false;
        }

        if (apellidoInput.value.trim() === '' || apellidoInput.value.length > 25) {
            alert('El campo Apellido debe estar lleno y tener una longitud máxima de 25 caracteres.');
            valid = false;
        }

        const direccionPrefixes = ['cll', 'cra', 'av', 'anv', 'trans'];
        let isValidDireccion = false;
        for (const prefix of direccionPrefixes) {
            if (direccionInput.value.trim().startsWith(prefix)) {
                isValidDireccion = true;
                break;
            }
        }
        if (!isValidDireccion) {
            alert('El campo Dirección debe empezar por una de las siguientes palabras: cll, cra, av, anv, trans.');
            valid = false;
        }

        if (cedulaInput.value.trim().length < 10 || cedulaInput.value.trim().length > 20 || !/^[a-zA-Z0-9]+$/.test(cedulaInput.value.trim())) {
            alert('El campo Cédula debe tener entre 10 y 20 caracteres alfanuméricos sin caracteres especiales.');
            valid = false;
        }

        if (contraseñaInput.value.trim().length < 15 || contraseñaInput.value.trim().length > 20 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#%/&])[A-Za-z\d#%/&]{15,20}$/.test(contraseñaInput.value.trim())) {
            alert('El campo Contraseña debe tener entre 15 y 20 caracteres, contener al menos una mayúscula, un número y uno de los siguientes caracteres especiales: #, %, /, &.');
            valid = false;
        }

        if (contraseñaInput.value.trim() !== confirmarContraseñaInput.value.trim()) {
            alert('La confirmación de contraseña no coincide.');
            valid = false;
        }

        if (emailInput.value.trim().length === 0 || emailInput.value.trim().length > 120) {
            alert('El campo Email debe estar lleno y tener una longitud máxima de 120 caracteres.');
            valid = false;
        }

        if (!valid) {
            event.preventDefault();
            alert('Formulario no enviado.')
            preventDefault()
        } else {
            // Limpiar los valores del formulario después de enviarlo
            form.reset();
            alert('Formulario enviado exitosamente.');
            event.preventDefault();
        }

        radioButtons.forEach(function (radioButton) {
            radioButton.addEventListener('change', mostrarColorInput);
        });

        function mostrarColorInput() {
            const colorInput = document.getElementById('colorInput');
            const colorRadio = document.getElementById('colorRadio');
            if (colorRadio.checked) {
                colorInput.style.display = 'block';
            } else {
                colorInput.style.display = 'none';
            }
        }
    });

    // Función para mostrar el campo de color favorito cuando se selecciona "Color favorito"
    function mostrarColorInput() {
        if (document.getElementById('colorRadio').checked) {
            colorInput.style.display = 'block';
        } else {
            colorInput.style.display = 'none';
        }
    }

    // Asignar evento change a cada radio button
    radioButtons.forEach(function(radioButton) {
        radioButton.addEventListener('change', mostrarColorInput);
    });

});

function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    if (from > to) {
        fromSlider.value = to;
        fromInput.value = to;
    } else {
        fromSlider.value = from;
    }
}

function controlToInput(toSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    setToggleAccessible(toInput);
    if (from <= to) {
        toSlider.value = to;
        toInput.value = to;
    } else {
        toInput.value = from;
    }
}

function controlFromSlider(fromSlider, toSlider, fromInput) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    if (from > to) {
        fromSlider.value = to;
        fromInput.value = to;
    } else {
        fromInput.value = from;
    }
}

function controlToSlider(fromSlider, toSlider, toInput) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    setToggleAccessible(toSlider);
    if (from <= to) {
        toSlider.value = to;
        toInput.value = to;
    } else {
        toInput.value = from;
        toSlider.value = from;
    }
}

function getParsed(currentFrom, currentTo) {
    const from = parseInt(currentFrom.value, 10);
    const to = parseInt(currentTo.value, 10);
    return [from, to];
}

function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
    const rangeDistance = to.max-to.min;
    const fromPosition = from.value - to.min;
    const toPosition = to.value - to.min;
    controlSlider.style.background = `linear-gradient(
        to right,
        ${sliderColor} 0%,
        ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,
        ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,
        ${rangeColor} ${(toPosition)/(rangeDistance)*100}%, 
        ${sliderColor} ${(toPosition)/(rangeDistance)*100}%, 
        ${sliderColor} 100%)`;
}

function setToggleAccessible(currentTarget) {
    const toSlider = document.querySelector('#toSlider');
    if (Number(currentTarget.value) <= 0 ) {
        toSlider.style.zIndex = 2;
    } else {
        toSlider.style.zIndex = 0;
    }
}

const fromSlider = document.querySelector('#fromSlider');
const toSlider = document.querySelector('#toSlider');
const fromInput = document.querySelector('#fromInput');
const toInput = document.querySelector('#toInput');
fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
setToggleAccessible(toSlider);

fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);