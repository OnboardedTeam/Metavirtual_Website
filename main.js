/*------------------------/
/                         /
/     RESPONSIVE PART     /
/                         /
/------------------------*/

window.mobileCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

if (window.mobileCheck()) {
    //Mobile version page display
    document.body.setAttribute("mobileVersion", "");
}

/*-------------------------------/
/                                /
/     END OF RESPONSIVE PART     /
/                                /
/-------------------------------*/





/*-----------------------/
/                        /
/     MAIN PAGE PART     /
/                        /
/-----------------------*/

document.addEventListener('DOMContentLoaded', () => {
    let discoverButton = document.getElementById("discoverButton");
    if (discoverButton && discoverButton != null) {
        if (false && !window.mobileCheck()) { //old stuff disabled by update
            document.body.setAttribute("locked", "");
            discoverButton.addEventListener("click", (event) => {
                let mainPage = document.getElementById("mainPage");
                mainPage.setAttribute("hidding", "");
                document.body.removeAttribute("locked");
                mainPage.addEventListener("animationend", (animationEvent) => {
                    if (animationEvent.animationName == "fadeOut") {
                        mainPage.setAttribute("hidden", "");
                        mainPage.removeAttribute("hidding");
    
                        checkSection();
                    }
                }, { once: true });
            });
        } else {
            discoverButton.addEventListener("click", (event) => {
                const target = document.querySelectorAll('header a.sectionLink')[0];
                if (target) {
                    target.setAttribute('selected', '');
                    event.preventDefault();

                    var targetSection = document.querySelector(target.getAttribute('href'));
                    var scrollOffset = targetSection.offsetWidth / 2;

                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'center',
                        scrollLeft: scrollOffset
                    });
                }
            });
        }
    }
});

/*------------------------------/
/                               /
/     END OF MAIN PAGE PART     /
/                               /
/------------------------------*/





/*------------------------/
/                         /
/     MENU LINKS PART     /
/                         /
/------------------------*/

var hashTarget = null;
window.addEventListener('click', (event) => {
    const target = event.target.closest('header a[href^="#"]');
    if (target) {
        const links = document.querySelectorAll('header a[href^="#"]');

        links.forEach(link => {
            link.removeAttribute('selected');
        });

        target.setAttribute('selected', '');
        event.preventDefault();

        var targetSection = document.querySelector(target.getAttribute('href'));
        var scrollOffset = targetSection.offsetWidth / 2;

        hashTarget = targetSection;
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
            scrollLeft: scrollOffset
        });
    }
});

window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    const target = document.querySelector(`header a[href="${hash}"]`);
    hashTarget = target;

    const links = document.querySelectorAll('header a[href^="#"]');

    links.forEach(link => {
        link.removeAttribute('selected');
    });
    if (target) {
        target.setAttribute('selected', '');
    }
});

function isElementVisible(elem) {
    if (!(elem instanceof Element)) throw Error('DomUtil: elem is not an element.');
    const style = getComputedStyle(elem);
    if (style.display === 'none') return false;
    if (style.visibility !== 'visible') return false;
    if (style.opacity < 0.1) return false;
    if (elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height +
        elem.getBoundingClientRect().width === 0) {
        return false;
    }
    const elemCenter = {
        x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
        y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
    };
    if (elemCenter.x < 0) return false;
    if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
    if (elemCenter.y < 0) return false;
    if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
    let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
    do {
        if (pointContainer === elem) return true;
    } while (pointContainer = pointContainer?.parentNode);
    return false;
}

function checkSection() {
    const sections = Array.from(document.querySelectorAll('section')); // Sélectionnez toutes les sections
    sections.push(document.querySelector("div#mainPage"))

    sections.forEach(section => {
        const link = document.querySelector(`header a[href="#${section.id}"]`); // Trouvez le lien correspondant à la section

        if (link && isElementVisible(section)) { // Vérifiez si la section est visible
            const links = document.querySelectorAll('header a[href^="#"]');

            links.forEach(link => {
                link.removeAttribute('selected');
            });

            link.setAttribute('selected', '');
            if (hashTarget == section) {
                setTimeout(() => {
                    hashTarget = null;
                }, 450);
            }
        }
    });
};

document.body.addEventListener('scroll', () => {
    checkSection();
});
checkSection();

/*-------------------------------/
/                                /
/     END OF MENU LINKS PART     /
/                                /
/-------------------------------*/





/*-------------------------------/
/                                /
/     HORIZONTAL SCROLL PART     /
/                                /
/-------------------------------*/

function hasOverflowHiddenClass(element) {
    const computedStyles = window.getComputedStyle(element);
    const overflowValue = computedStyles.getPropertyValue('overflow');
    return overflowValue != 'auto' && overflowValue != 'overlay' && overflowValue != 'scroll';
}

function isElementOrParentScrollable(element) {
    let currentElement = element;

    while (currentElement !== null && currentElement !== document.body) {
        if ((currentElement !== document.body && (currentElement.scrollHeight > currentElement.clientHeight || currentElement.scrollWidth > currentElement.clientWidth)) && !hasOverflowHiddenClass(currentElement)) {
            return currentElement; // Scrollbar found and no overflow-hidden class on the element
        }

        currentElement = currentElement.parentElement;
    }

    return null; // No scrollbar found in any parent or body element reached, or an overflow-hidden class is present
}

function getScrollTop(element) {
    if (element.scrollTop === 0) {
        return -1; // Scroll position at the start
    } else if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
        return 1; // Scroll position at the end
    } else {
        return 0; // Scroll position in between
    }
}

function getScrollLeft(element) {
    if (element.scrollLeft === 0) {
        return -1; // Scroll position at the start
    } else if (element.scrollLeft + element.clientWidth >= element.scrollWidth) {
        return 1; // Scroll position at the end
    } else {
        return 0; // Scroll position in between
    }
}

function getScrollPosition(element) {
    return {top: getScrollTop(element), left: getScrollLeft(element)};
}

var bodyScrollContext = 'vertical';
function defineBodyScrollContext(load) {
    let element = document.body;
    let bodyScrollPosition = getScrollPosition(element);
    if (bodyScrollContext == 'both' || load) {
        if (bodyScrollPosition.top != 1) {
            bodyScrollContext = 'vertical';
        } else if (bodyScrollPosition.left != -1) {
            bodyScrollContext = 'horizontal';
        }
    } else if (bodyScrollContext == 'vertical') {
        if (bodyScrollPosition.top == 1) {
            bodyScrollContext = 'both';
        } else if (bodyScrollPosition.left != -1 && hashTarget == null) {
            element.style.scrollBehavior = "initial";
            element.scrollLeft = 0;
            element.style.scrollBehavior = "";
        }
    } else if (bodyScrollContext == 'horizontal') {
        if (bodyScrollPosition.left == -1) {
            bodyScrollContext = 'both';
        } else if (bodyScrollPosition.top != 1 && hashTarget == null) {
            element.style.scrollBehavior = "initial";
            element.scrollTop = element.scrollHeight - element.clientHeight;
            element.style.scrollBehavior = "";
        }
    }
    if (hashTarget != null) {
        if (bodyScrollPosition.top == 0 && bodyScrollPosition.left == 0) {
            bodyScrollContext = 'both';
        }
    }
    if (bodyScrollContext == 'both') {
        element.style.overflowY = "auto";
        element.style.overflowX = "auto";
    } else if (bodyScrollContext == 'vertical') {
        element.style.overflowY = "auto";
        element.style.overflowX = "hidden";
    } else if (bodyScrollContext == 'horizontal') {
        element.style.overflowY = "hidden";
        element.style.overflowX = "auto";
    }
}

if (!window.mobileCheck()) {
    //Desktop version page display
    
    // modern Chrome requires { passive: false } when adding event
    var supportsPassive = false;
    try {
        window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
            get: function () { supportsPassive = true; }
        }));
    } catch (e) { }

    var wheelOpt = supportsPassive ? { passive: false } : false;
    var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

    document.addEventListener('DOMContentLoaded', () => {
        document.body.addEventListener('scroll', (scrollEvent) => {
            defineBodyScrollContext();
        }, wheelOpt);
        defineBodyScrollContext(true);

        document.addEventListener(wheelEvent, (event) => {
            if (event.ctrlKey) {
                return;
            }
            let scrolling = true;
            let deltaY = event.deltaY;

            var hasToReturn = false;
            var hasToPrevent = false;
            let bodyScrollPosition = getScrollPosition(document.body);
            if (deltaY > 0 && bodyScrollPosition.top != 1) {
                hasToReturn = true;
            } else if (deltaY < 0 && bodyScrollPosition.left != -1) {
                hasToPrevent = true;
            } else if (deltaY < 0 && bodyScrollPosition.left == -1) {
                hasToReturn = true;
            }

            potentialScrolling = isElementOrParentScrollable(event.target);
            if (potentialScrolling && potentialScrolling != null) {
                let scrollPosition = getScrollPosition(potentialScrolling).top;

                if (scrollPosition === -1) {
                    //at the start
                    deltaY = Math.min(0, deltaY);
                } else if (scrollPosition === 1) {
                    //at the end
                    deltaY = Math.max(0, deltaY);
                } else {
                    //between
                    scrolling = false;
                }
            } else {
                if (hasToPrevent) event.preventDefault();
                if (hasToReturn) return;
            }
            if (scrolling) {
                if (nextScrollTo == null) {
                    nextScrollTo = 0;
                }
                nextScrollTo += deltaY * 2;
            }
        }, wheelOpt);
        
    });
  
    var nextScrollTo = null;
    setInterval(() => {
        if (nextScrollTo != null && !document.body.hasAttribute('locked')) {
            scrollByPage(nextScrollTo);
        }
        nextScrollTo = null;
    }, 85);
    
    function scrollTo(options) {
        requestAnimationFrame(() => {
            document.body.scrollTo(options);
        });
    }
    function scrollToMax(down) {
        var maxScrollLeft = document.body.scrollWidth - document.body.clientWidth;
        var maxScrollTop = document.body.scrollHeight - document.body.clientHeight;
        
        let scrollOptions = { behavior: 'smooth' };
        if (down) {
            scrollOptions.top = maxScrollTop;
        } else {
            scrollOptions.left = maxScrollLeft;
        }
        scrollTo(scrollOptions);
    }
    function scrollToMin(down) {
        let scrollOptions = { behavior: 'smooth' };
        if (down) {
            scrollOptions.top = 0;
        } else {
            scrollOptions.left = 0;
        }
        scrollTo(scrollOptions);
    }
    function scrollByPage(delta, down) {
        var maxScrollLeft = document.body.scrollWidth - document.body.clientWidth;
        var maxScrollTop = document.body.scrollHeight - document.body.clientHeight;

        let scrollOptions = { behavior: 'smooth' };
        if (down) {
            scrollOptions.top = document.body.scrollTop + delta;
        } else {
            scrollOptions.left = document.body.scrollLeft + delta;
        }
        scrollTo(scrollOptions);
    }
    
    
    var isKeyDown = false;
    document.addEventListener('keydown', (event) => {
        if (isKeyDown == false && !document.body.hasAttribute('locked')) {
            isKeyDown = true;
            let scrollDown = (bodyScrollContext == 'vertical' ? true : false);
            let scrollUp = (bodyScrollContext == 'horizontal' ? false : true);
            if (event.key === 'End') {
                event.preventDefault();
                scrollToMax(scrollDown);
            } else if (event.key === 'Home') {
                event.preventDefault();
                scrollToMin(scrollUp);
            } else if (event.key === 'PageDown') {
                event.preventDefault();
                if (event.altKey) {
                    scrollToMax(scrollDown);
                } else {
                    scrollByPage(500, scrollDown);
                }
            } else if (event.key === 'PageUp') {
                event.preventDefault();
                if (event.altKey) {
                    scrollToMin(scrollUp);
                } else {
                    scrollByPage(-500, scrollUp);
                }
            }
            setTimeout(() => {
                isKeyDown = false;
            }, 150)
        }
    });
}


/*--------------------------------------/
/                                       /
/     END OF HORIZONTAL SCROLL PART     /
/                                       /
/--------------------------------------*/