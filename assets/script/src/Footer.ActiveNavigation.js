/**
 * sets/removes a class when the page is scrolled
 */
require(["lib/intersection-observer"], function() {
    var links = document.querySelectorAll("nav.main a");
    if (!links.length) {
        return;
    }

    var items = {};
    var sections = [];

    var setActiveSection = function(elem) {
        if (elem) {
            var id = elem.target.hasAttribute("id") ? elem.target.getAttribute("id") : "";
            if (!id) {
                return;
            }

            for (var sectionId in items) {
                if (sectionId === id) {
                    for (var l = 0; l < items[sectionId].links.length; l++) {
                        items[sectionId].links[l].classList.add("active");
                    }
                } else {
                    for (var l = 0; l < items[sectionId].links.length; l++) {
                        items[sectionId].links[l].classList.remove("active");
                    }
                }
            }
        }
    };

    var observer = new IntersectionObserver(
        function(entries) {
            // isIntersecting is true when element and viewport are overlapping
            // isIntersecting is false when element and viewport don't overlap
            var intersectionRatio = 0;
            var mostVisibleEntry = null;
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting === true) {
                    if (entries[i].intersectionRatio > intersectionRatio) {
                        intersectionRatio = entries[i].intersectionRatio;
                        mostVisibleEntry = entries[i];
                    }
                }
            }
            setActiveSection(mostVisibleEntry);
        },
        {
            threshold: 0.5
        }
    );

    for (var l = 0; l < links.length; l++) {
        var id = links[l].hasAttribute("href") && links[l].getAttribute("href").split("#")[1] ? links[l].getAttribute("href").split("#")[1] : "";
        if (!id) {
            continue;
        }

        var section = document.querySelector("#" + id);
        if (!section) {
            continue;
        }

        sections.push(section);
        observer.observe(section);

        if (items.id) {
            items.id.links.push(links[l]);
        } else {
            items[id] = {
                section: section,
                links: [links[l]]
            };
        }
    }

    if (!sections.length) {
        observer.disconnect();
    }
});
