// Modal show/hide

var modalContainer = document.querySelector(".modalContainer");
var modalIframe = modalContainer.querySelector("iframe");
var modalOpenNewTab = modalContainer.querySelector("a.newTab");

function openModal(href) {
    if (!modalContainer.hasAttribute("unhidding") && !modalContainer.hasAttribute("hidding")) {
        modalContainer.setAttribute("unhidding", "");
        modalIframe.removeAttribute("src");
        modalOpenNewTab.removeAttribute("href");
        modalIframe.src = modalOpenNewTab.href = href;
        modalContainer.removeAttribute("hidden");

        modalContainer.addEventListener("animationend", (eAnim) => {
            if (eAnim.animationName === "fadeIn") {
                modalContainer.removeAttribute("unhidding");
            }
        }, { once: true });
    }
}

function closeModal() {
    if (!modalContainer.hasAttribute("hidding") && !modalContainer.hasAttribute("hidden")) {
        modalContainer.setAttribute("hidding", "");

        modalContainer.addEventListener("animationend", (eAnim) => {
            if (eAnim.animationName === "fadeOut") {
                modalContainer.setAttribute("hidden", "");
                modalContainer.removeAttribute("hidding");
                modalIframe.removeAttribute("src");
                modalOpenNewTab.removeAttribute("href");
            }
        }, { once: true });
    }
}

modalIframe.addEventListener("load", (eventIframe) => {
    let lastModalSrc = modalOpenNewTab.href;

    if (!modalContainer.hasAttribute("unhidding") && !modalContainer.hasAttribute("hidding") && !modalContainer.hasAttribute("hidden")) {
        let lastModalPath = (new URL(lastModalSrc)).pathname;
        lastModalSrc = (new URL(lastModalSrc)).origin + (lastModalPath?.endsWith("/") ? lastModalPath : (lastModalPath ? `${lastModalPath}/` : ''));
        let currentModalSrc = modalIframe.contentWindow.location.href;
        let currentModalPath = modalIframe.contentWindow.location.pathname;
        currentModalSrc = (new URL(currentModalSrc)).origin + (currentModalPath?.endsWith("/") ? currentModalPath : (currentModalPath ? `${currentModalPath}/` : ''));
        console.log(currentModalSrc, lastModalSrc)
        if (currentModalSrc != lastModalSrc) {
            eventIframe.preventDefault(); // prevent navigation
            closeModal();
        }
    }
});

window.addEventListener("click", (event) => {
    var target = event.target;

    var modalContainer = document.querySelector(".modalContainer");
    var modalIframe = modalContainer.querySelector("iframe");

    if (target.tagName === "A" && target.getAttribute("href")) {
        var href = target.getAttribute("href");

        if (target.hasAttribute("openModal") && target.getAttribute("openModal") !== "false") {
            event.preventDefault(); // cancel navigation

            openModal(href);
        }
    } else if (!modalContainer.hasAttribute("hidden") && !modalContainer.hasAttribute("hidding")) {
        if ((target === modalContainer && target !== modalIframe) || (target.tagName === "BUTTON" && target.classList.contains("goBack"))) {
            event.preventDefault(); // cancel navigation
            closeModal();
        }
    }
});