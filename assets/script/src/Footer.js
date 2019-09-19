// mark touchdevice
let isTouchDevice = () => {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 || (window.DocumentTouch && document instanceof DocumentTouch);
};

document.querySelector("html").classList.add(isTouchDevice() ? "touchevents" : "no-touchevents");


