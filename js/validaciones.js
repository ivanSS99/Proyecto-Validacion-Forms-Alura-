export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    };

    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = '';
    } else {
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }

};

const tipoDeErrores = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError',
];

const mensajesDeError = {
    nombre: {
        valueMissing: 'Este campo nombre no puede estar vacío'
    },
    email: {
        valueMissing: 'Este campo correo no puede estar vacío',
        typeMismatch: 'El correo no es valido'
    },
    password: {
        valueMissing: 'Este campo contraseña no puede estar vacío',
        patternMismatch: 'Minimo 6 caracteres, maximo 12 caracteres, debe tener al menos una letra minúscula y una mayúscula, un numero y no debe contener caracteres especiales.'
    },
    nacimiento: {
        valueMissing: 'Este campo fecha-nacimiento no puede estar vacío',
        customError: 'Debes tener al menos 18 años de edad'
    },
    numero: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'El formato requerido es  XXXXX-XXXXX (10 números)'
    },
    direccion: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'La direccion debe contener entre 10 a 40 caracteres'
    },
    ciudad: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'La ciudad debe contener entre 3 a 40 caracteres'
    },
    estado: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'El estado debe contener entre 3 a 40 caracteres'
    },
};


const validadores = {
    nacimiento: input => validarNacimiento(input),
}

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = '';
    tipoDeErrores.forEach( error => {
        if(input.validity[error]){
            mensaje = mensajesDeError[tipoDeInput][error]
        }
    });

    return mensaje;
}

function validarNacimiento (input){
    const fechaCliente = new Date(input.value);
    mayorDeEdad(fechaCliente);
    let mensaje = '';
    if(!mayorDeEdad(fechaCliente)){
        mensaje = 'Debes tener al menos 18 años de edad'
    };

    // Esta funcion manda un mensaje con el contenido que se le pasa como valor, viendose parecido a un alert. Es usada para mostrar mensajes de error principalmente
    input.setCustomValidity(mensaje);
};

function mayorDeEdad (fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCFDate());

    return (diferenciaFechas <= fechaActual);
}