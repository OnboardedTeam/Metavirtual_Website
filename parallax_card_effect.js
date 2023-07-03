/******************************************************************\
|                                                                  |
|                         Made by NitramO                          |
|                  Martin Ben Jenec - 29/03/2023                   |
|                                                                  |
|            Parallax hover effect animation for cards.            |
|                        V1.2 - 23/06/2023                         |
|                                                                  |
\******************************************************************/





const cursorEffects_cursor3D_perspective = "650px";
const cursorEffects_cursor3D_reset_timing = "0.25s";

var lastCard;
var currentCardTransition = false;
var currentCardReady = false;

//reset a specific card (removing old transform style before animation)
function resetCard(card) {
    const cursorEffects_cursor3D_reset_timing = "0.25s";

    let reset = false;
    if (card.hasAttribute("effect-reset")) {
        reset = card.getAttribute("effect-reset") != "false";
    }
    if (reset == true) {
        card.style.transition = `${cursorEffects_cursor3D_reset_timing}`;
        card.style.transform = `perspective(${cursorEffects_cursor3D_perspective}) rotateX(0deg) rotateY(0deg)`;
    } else {
        card.style.transform = "";
        card.style.transition = "";
    }
}

//reset every cards of the page
function resetCards() {
    const cardsList = document.querySelectorAll(":is([effect=cursor3D])");
    cardsList.forEach((card) => {
        resetCard(card);
    });
    currentCardTransition = currentCardReady = false;
    lastCard = undefined;
}

//detect hover to start the effect
window.addEventListener("mousemove", (event) => {
    const cardsList = document.querySelectorAll(":is([effect=cursor3D])");
    const path = event.path || (event.composedPath && event.composedPath());
    const card = Array.from(cardsList).find((card) => path.includes(card));
    if (card) {
        if (lastCard && card != lastCard) {
            resetCard(lastCard);
            currentCardTransition = currentCardReady = false;
        }

        if (!currentCardReady && !currentCardTransition) {
            let reset = false;
            if (card.hasAttribute("effect-reset")) {
                reset = card.getAttribute("effect-reset") != "false";
            }
            if (reset == true) {
                resetCard(card);
            }
        }

        let power = 1;
        if (card.hasAttribute("effect-power")) {
            power = card.getAttribute("effect-power") || power;
        }

        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = event.clientX - centerX;
        const deltaY = event.clientY - centerY;
        const angleX = (deltaY / 15) * power;
        const angleY = (-deltaX / 20) * power;

        requestAnimationFrame(() => {
            if (!lastCard || card == lastCard) {
                card.style.transform = `perspective(${cursorEffects_cursor3D_perspective}) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            }
        });
        lastCard = card;
        if (!currentCardReady && !currentCardTransition) {
            currentCardTransition = true;
            card.addEventListener(
                "transitionend",
                (transEvent) => {
                    if (transEvent.propertyName == "transform") {
                        if (!lastCard || card == lastCard) {
                            currentCardReady = true;
                            currentCardTransition = false;
                            card.style.transition = "0s";
                        }
                    }
                },
                { once: true }
            );
        }
    } else {
        resetCards();
    }
});

//reset cards on losing page focus
window.addEventListener("blur", (event) => {
    resetCards();
});

//reset cards on losing page focus
window.addEventListener("mouseout", (event) => {
    resetCards();
});