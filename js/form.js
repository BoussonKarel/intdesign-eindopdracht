let htmlSignupButton, name = {}, email = {};

const handleFloatingLabel = function(formfield, input) {
    input.addEventListener("blur", function() {
        if (isEmpty(input.value)) {
            formfield.classList.remove("is-floating");
        }
        else {
            formfield.classList.add("is-floating");
        }
    });
}

const showError = function(item, errorMsg) {
    item.formfield.classList.add("has-error");
    item.error.innerHTML = errorMsg;
}

const removeError = function(item) {
    item.formfield.classList.remove("has-error");
    item.error.innerHTML = "";
}


const validateName = function() {
    if (isEmpty(name.input.value)) {
        showError(name, "Please fill in your name.");
        return false;
    }
    else {
        removeError(name);
        return true;
    }
}

const validateEmail = function() {
    if (isEmpty(email.input.value)) {
        showError(email, "Please fill in your email.")
        return false;
    }
    else if (!isValidEmailAddress(email.input.value)) {
        showError(email, "That email doesn't look valid.")
        return false;
    }
    else {
        removeError(email);
        return true;
    }
}

const isValidEmailAddress = function(emailAddress) {
    // Basis manier om e-mailadres te checken.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
};

const isEmpty = function(fieldValue) {
    return !fieldValue || !fieldValue.length;
};

const handleValidation = function() {
    // Validate on focus loss
    name.input.addEventListener("blur", function() {
        validateName();
    });

    email.input.addEventListener("blur", function() {
        validateEmail();
    });

    // Validate on button press
    htmlSignupButton.addEventListener("click", function() {
        if (validateName() && validateEmail()) {
            console.log(`Succesfully subscribed ${name.input.value} with email ${email.input.value}.`)
        }
    });
}

const getInputElements = function() {
    name.formfield = document.querySelector(".js-name-field");
    name.label = name.formfield.querySelector(".js-label");
    name.input = name.formfield.querySelector(".js-input");
    name.error = name.formfield.querySelector(".js-error");
    console.log("Name done");
    
    email.formfield = document.querySelector(".js-email-field");
    email.label = email.formfield.querySelector(".js-label");
    email.input = email.formfield.querySelector(".js-input");
    email.error = email.formfield.querySelector(".js-error");
    console.log("Email done");

    htmlSignupButton = document.querySelector(".js-sign-up");
}

const init = function() {
    console.log("Document loaded");
    htmlName = document.querySelector(".js-name");

    getInputElements();

    handleFloatingLabel(name.formfield, name.input);
    handleFloatingLabel(email.formfield, email.input);

    handleValidation();
}

document.addEventListener("DOMContentLoaded", init);