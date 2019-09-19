// navigation button for narrow devices
(function(d) {
    let btn = d.querySelector("#toggle-navigation"),
        html = d.querySelector("html"),
        actCls = "header-overlay-active",
        inactCls = "header-overlay-inactive",
        isActive = false;

    let setActive = () => {
        html.classList.remove(inactCls);
        html.classList.add(actCls);
        d.removeEventListener("click", setInactive);
        isActive = true;
    };

    let setInactive = () => {
        html.classList.remove(actCls);
        html.classList.add(inactCls);
        d.addEventListener("click", setInactive);
        isActive = false;
    };

    btn.addEventListener(
        "click",
        e => {
            e.preventDefault();
            e.stopPropagation();
            if (isActive) {
                setInactive();
            } else {
                setActive();
            }
        },
        false
    );
    d.addEventListener("click", function() {
        if (isActive) {
            setInactive();
        }
    });
    //setActive();
})(document);
