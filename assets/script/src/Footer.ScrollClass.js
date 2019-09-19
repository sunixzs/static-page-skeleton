/**
 * sets/removes a class when the page is scrolled
 */
(function(w, d) {
    let ticking = false;
    let isScrolled = false;
    let html = d.querySelector("html");
    w.addEventListener("scroll", e => {
        if (!ticking) {
            w.requestAnimationFrame(() => {
                if (isScrolled && w.scrollY <= 0) {
                    isScrolled = false;
                    html.classList.remove("page-is-scrolled");
                    html.classList.add("page-is-not-scrolled");
                } else if (!isScrolled && w.scrollY > 0) {
                    isScrolled = true;
                    html.classList.remove("page-is-not-scrolled");
                    html.classList.add("page-is-scrolled");
                }
                //var tp = w.innerHeight - 232;
                //if (w.scrollY > tp) {
                //    html.classList.add("page-is-scrolled-a-lot");
                //} else {
                //    html.classList.remove("page-is-scrolled-a-lot");
                //}
                ticking = false;
            });

            ticking = true;
        }
    });
})(window, document);
