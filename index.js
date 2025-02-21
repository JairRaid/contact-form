const errorMsgEl = document.querySelectorAll(".error-msg");
const firstNameError = document.getElementById("first-name-error");
const lastNameError = document.getElementById("last-name-error");
const emailError = document.getElementById("email-error");
const queryError = document.getElementById("query-error");
const messageError = document.getElementById("message-error");
const consentError = document.getElementById("consent-error");
const notification = document.getElementById("notification");
let notifHeight = notification.offsetHeight;
let timeoutRef;

function initialisation() {
    hideAllErrorMsg();
    console.log(notifHeight);
    notification.style.top = `-${notifHeight}px`;
}

initialisation();

function hideAllErrorMsg() {
    for (const element of Object.values(errorMsgEl)) {
        element.classList.add("hide");
    }
}

function getQueryTypeValue(inputsList) {
    let val = "";
    for (const element of Object.values(inputsList)) {
        if (element.checked) {
            val = element.value;
            return val;
        }
    }
    return val;
}

function firstNameErrorDisplay(isShow) {
    if (isShow) {
        firstNameError.classList.remove("hide");
        document.getElementById("first-name").classList.add("error-input");
        return;
    } else {
        firstNameError.classList.add("hide");
        document.getElementById("first-name").classList.remove("error-input");
    }
}

function lastNameErrorDisplay(isShow) {
    if (isShow) {
        lastNameError.classList.remove("hide");
        document.getElementById("last-name").classList.add("error-input");
        return;
    } else {
        lastNameError.classList.add("hide");
        document.getElementById("last-name").classList.remove("error-input");
    }
}

function emailErrorDisplay(isShow) {
    if (isShow) {
        emailError.classList.remove("hide");
        document.getElementById("email").classList.add("error-input");
        return;
    } else {
        emailError.classList.add("hide");
        document.getElementById("email").classList.remove("error-input");
    }
}

function queryErrorDisplay(isShow) {
    if (isShow) {
        queryError.classList.remove("hide");
        return;
    } else {
        queryError.classList.add("hide");
    }
}

function messageErrorDisplay(isShow) {
    if (isShow) {
        messageError.classList.remove("hide");
        document.getElementById("message").classList.add("error-input");
        return;
    } else {
        messageError.classList.add("hide");
        document.getElementById("message").classList.remove("error-input");
    }
}

function consentErrorDisplay(isShow) {
    if (isShow) {
        consentError.classList.remove("hide");
        return;
    } else {
        consentError.classList.add("hide");
    }
}

function showNotification() {
    notification.style.top = "24px";
    if (!timeoutRef) {
        timeoutRef = setTimeout(() => {
            notifHeight = notification.offsetHeight;
            notification.style.top = `-${notifHeight + 50}px`;
            clearTimeout(timeoutRef);
            timeoutRef = null;
        }, 5000);
    }
}

function validateForm() {
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const inputRadios = document.querySelectorAll("input[type='radio']");
    const queryType = getQueryTypeValue(inputRadios);
    const msg = document.getElementById("message").value.trim();
    const consent = document.getElementById("consent-checkbox").checked ? document.getElementById("consent-checkbox").value : false;

    firstNameErrorDisplay(!firstName);
    lastNameErrorDisplay(!lastName);
    emailErrorDisplay(!email);
    queryErrorDisplay(!queryType);
    messageErrorDisplay(!msg);
    consentErrorDisplay(!consent);


    if (!firstName) {
        console.log(typeof firstName);
        return false;
    }

    if (!lastName) {
        return false;
    }

    if (!email) {
        return false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
        return false;
    }

    if (!queryType) {
        return false;
    }

    if (!msg) {
        return false;
    }

    if (!consent) {
        return false;
    }

    return true;
}

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    if (validateForm()) {
        showNotification();
    }
});
