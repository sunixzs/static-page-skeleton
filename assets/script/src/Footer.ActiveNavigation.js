/**
 * sets/removes a class when the page is scrolled
 */
require(["lib/intersection-observer"], function() {
    const links = document.querySelectorAll("nav.main a");
    if (!links.length) {
        return;
    }

    let items = {};
    let sections = [];

    let setActiveSection = elem => {
        if (elem) {
            let id = elem.target.hasAttribute("id") ? elem.target.getAttribute("id") : "";
            if (!id) {
                return;
            }

            for (let sectionId in items) {
                if (sectionId === id) {
                    items[sectionId].links.forEach(link => {
                        link.classList.add("active");
                    });
                } else {
                    items[sectionId].links.forEach(link => {
                        link.classList.remove("active");
                    });
                }
            }
        }
    };

    const observer = new IntersectionObserver(
        entries => {
            // isIntersecting is true when element and viewport are overlapping
            // isIntersecting is false when element and viewport don't overlap
            let intersectionRatio = 0;
            let mostVisibleEntry = null;
            entries.forEach(entry => {
                if (entry.isIntersecting === true) {
                    if (entry.intersectionRatio > intersectionRatio) {
                        intersectionRatio = entry.intersectionRatio;
                        mostVisibleEntry = entry;
                    }
                }
            });

            setActiveSection(mostVisibleEntry);
        },
        {
            threshold: 0.5
        }
    );

    for (let l = 0; l < links.length; l++) {
        let id = links[l].hasAttribute("href") && links[l].getAttribute("href").split("#")[1] ? links[l].getAttribute("href").split("#")[1] : "";
        if (!id) {
            continue;
        }

        let section = document.querySelector("#" + id);
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
