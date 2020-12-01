let htmlFormfields;

const handleFloatingLabel = function() {
    htmlFormfields = document.querySelectorAll(".js-form-field");
    for (const formfield of htmlFormfields) {
        const label = formfield.querySelector(".js-label");
        const input = formfield.querySelector(".js-input");
        console.log(label, input);

        input.addEventListener("blur", function() {
            if (!input.value || !input.value.length) {
                formfield.classList.remove("is-floating");
                console.log(formfield);
            }
            else {
                formfield.classList.add("is-floating");
            }
        })
    }
}

const init = function() {
    console.log("Document loaded");
    handleFloatingLabel();
}

document.addEventListener("DOMContentLoaded", init);