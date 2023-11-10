// close/open form popup toggle
const popupForm = document.getElementById("popupForm");
const popupFormCloseButton = document.getElementById("closePopupFormButton");
popupForm.addEventListener("click", (event) => {
    if (popupForm.hasAttribute("closed")) {
        popupForm.toggleAttribute("closed");
    } else if (event.target.isSameNode(popupFormCloseButton)) {
        popupForm.toggleAttribute("closed");
    }
    localStorage.setItem("popupFormClosed", popupForm.hasAttribute("closed")); // save state to local storage
});

// get state from local storage
var popupFormClosed = localStorage.getItem("popupFormClosed");
if (popupFormClosed == "true") {
    popupForm.setAttribute("closed", "");
} else {
    popupForm.removeAttribute("closed");

}


// link phone indicator to phone number input
const popupContactPhoneIndicator = document.getElementById("popupContactPhoneIndicator");
const popupContactMobilePhone = document.getElementById("popupContactMobilePhone");

var popupContactPhoneIndicatorLastValue = popupContactPhoneIndicator.value;
popupContactPhoneIndicator.addEventListener("change", (event) => {
    var newValue = event.target.value;

    let lastIndicator = `+${popupContactPhoneIndicatorLastValue}`;
    let newIndicator = `+${newValue}`;

    var mobilePhoneValue = popupContactMobilePhone.value;

    if (mobilePhoneValue.startsWith("+")) {
        if (mobilePhoneValue.startsWith(lastIndicator)) {
            popupContactMobilePhone.value = mobilePhoneValue.replace(lastIndicator, newIndicator);
        } else {
            popupContactMobilePhone.value = mobilePhoneValue.replace("+", newIndicator);
        }
    } else {
        popupContactMobilePhone.value = newIndicator + mobilePhoneValue;
    }

    popupContactPhoneIndicatorLastValue = newValue;
});

// link phone number input to phone indicator
popupContactMobilePhone.addEventListener("input", (event) => {
    var newValue = event.target.value;

    if (newValue.startsWith("+")) {
        let potentialIndicator = newValue.replace("+", "");
        let found = false
        for (let i = 0; i < potentialIndicator.length; i++) {
            let indicator = potentialIndicator.slice(0, i == 0 ? undefined : -i);
            if (popupContactPhoneIndicator.querySelector(`option[value="${indicator}"]`)) {
                popupContactPhoneIndicatorLastValue = indicator;
                popupContactPhoneIndicator.value = indicator;
                found = true;
                break;
            }
        }
        if (!found) {
            popupContactMobilePhone.value = newValue.replace("+", `+${popupContactPhoneIndicator.value}`);
        }
    } else {
        popupContactMobilePhone.value = `+${popupContactPhoneIndicator.value}${newValue}`;
    }
});