const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const age = document.getElementById('age');

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'El email no es válido');
    }
}

function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} es obligatorio`);
        } else{
            showSuccess(input);
        }
    });
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} debe tener al menos ${min} caracteres`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} debe tener menos de ${max} caracteres`);
    } else {
        showSuccess(input);
    }
}

function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Las contraseñas no coinciden');
    }
}

function checkAge(input) {
    if (input.value < 0 || input.value >= 1000) {
        showError(input, 'La edad debe estar entre 0 y 999');
    } else {
        showSuccess(input);
    }
}

function checkPasswordRules(input) {
    const value = input.value;

    if (value.length < 8) {
        showError(input, 'La contraseña debe tener al menos 8 caracteres');
        return;
    }
    if (!/[A-Z]/.test(value)) {
        showError(input, 'La contraseña debe contener una mayúscula');
        return;
    }
    if (!/[a-z]/.test(value)) {
        showError(input, 'La contraseña debe contener una minúscula');
        return;
    }
    if (!/[0-9]/.test(value)) {
        showError(input, 'La contraseña debe contener un número');
        return;
    }
    if (!/[`~!@#$%^&*()_+\-={}|[\]\\:;'<>?,.\/]/.test(value)) {
        showError(input, 'La contraseña debe contener un signo especial');
        return;
    }
    showSuccess(input);
}

function getFieldName(input){
    const nombres = {
        username: 'Usuario',
        email: 'Correo electrónico',
        password: 'Contraseña',
        password2: 'Confirmar contraseña',
        age: 'Edad'
    };
    return nombres[input.id] || input.id;
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email, password, password2, age]);
    checkLength(username, 3, 15);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
    checkAge(age);
    checkPasswordRules(password);
});