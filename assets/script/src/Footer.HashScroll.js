/**
 * sets/removes a class when the page is scrolled
 */
(function(w, d) {
    var headerOffset = 145;
    // scroll to position when target is set in url
    if (location && location.hash) {
        var target = d.querySelector(location.hash);
        if (target) {
            setTimeout(function() {
                w.scrollTo({
                    top: target.getBoundingClientRect().top + w.scrollY - headerOffset,
                    behavior: "smooth"
                });
            }, 1000);
        }
    }

    // check all links on page which have a hash to an existing element
    var links = d.querySelectorAll("a");
    for (var l = 0; l < links.length; l++) {
        if (links[l].hasAttribute("href")) {
            var hash = links[l].getAttribute("href").split("#")[1];
            if (hash && d.querySelector("#" + hash)) {
                links[l].addEventListener(
                    "click",
                    function(e) {
                        var hash = this.getAttribute("href").split("#")[1];
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
    }
})(window, document);
