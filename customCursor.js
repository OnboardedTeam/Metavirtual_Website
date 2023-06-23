window.addEventListener('mousemove', function (e) {
    var customCursor = document.querySelector('.custom-cursor');
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    requestAnimationFrame(() => {
        customCursor.style.left = (e.clientX / windowWidth * 100) + '%';
        customCursor.style.top = (e.clientY / windowHeight * 100) + '%';
    });
});