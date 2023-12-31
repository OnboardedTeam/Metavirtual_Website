/******************************************************************\
|                                                                  |
|                         Made by NitramO                          |
|                  Martin Ben Jenec - 27/06/2023                   |
|                                                                  |
|                      Custom cursor effect.                       |
|                        V1.1 - 03/07/2023                         |
|                                                                  |
\******************************************************************/





document.addEventListener('mouseover', displayCursor); //at load
window.addEventListener('mousemove', displayCursor); //while moving cursor
document.body.addEventListener('resize', displayCursor); //at resize
document.body.addEventListener('zoom', displayCursor); //at zoom
document.body.addEventListener('scroll', displayCursor); //at scroll

//hide cursor on losing page focus
window.addEventListener("blur", (event) => {
    setTimeout(() => {
        if (document.hidden) {
            hideCursor();
        }
    }, 85);
});

//hide cursor on losing page focus
window.addEventListener("mouseout", (event) => {
    hideCursor();
});

function hideCursor() {
    var customCursor = document.querySelector('.custom-cursor');
    customCursor.setAttribute("outPage", "");
}
function showCursor() {
    var customCursor = document.querySelector('.custom-cursor');
    customCursor.removeAttribute("outPage");
}
function displayCursor(e) {
    var customCursor = document.querySelector('.custom-cursor');
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    requestAnimationFrame(() => {
        customCursor.style.left = (e.clientX / windowWidth * 100) + '%';
        customCursor.style.top = (e.clientY / windowHeight * 100) + '%';
    });

    showCursor();
}