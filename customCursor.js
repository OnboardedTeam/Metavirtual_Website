window.addEventListener('mousemove', function (e) {
    var customCursor = document.querySelector('.custom-cursor');
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    requestAnimationFrame(() => {
        customCursor.style.left = (e.clientX / windowWidth * 100) + '%';
        customCursor.style.top = (e.clientY / windowHeight * 100) + '%';
    });

    showCursor();
});

//hide cursor on losing page focus
window.addEventListener("blur", (event) => {
    setTimeout(() => {
        if (document.hidden) {
            hideCursor();
        }
    }, 100);
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