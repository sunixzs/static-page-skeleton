/**
 * sets/removes a class when the page is scrolled
 */
(function(w, d) {
    let headerOffset = 145;
    // scroll to position when target is set in url
    if (location && location.hash) {
        let target = d.querySelector(location.hash);
        if (target) {
            setTimeout(() => {
                w.scrollTo({
                    top: target.getBoundingClientRect().top + w.scrollY - headerOffset,
                    behavior: "smooth"
                });
            }, 1000);
        }
    }

    // check all links on page which have a hash to an existing element
    let links = d.querySelectorAll("a");
    links.forEach(link => {
        if (link.hasAttribute("href")) {
            var hash = link.getAttribute("href").split("#")[1];
            if (hash && d.querySelector("#" + hash)) {
                link.addEventListener(
                    "click",
                    e => {
                        let hash = this.getAttribute("href").split("#")[1];
                        if (hash && d.querySelector("#" + hash)) {
                            e.preventDefault();
                            w.scrollTo({
                                top: d.querySelector("#" + hash).getBoundingClientRect().top + w.scrollY - headerOffset,
                                behavior: "smooth"
                            });
                        }
                    },
                    false
                );
            }
        }
    });
})(window, document);
