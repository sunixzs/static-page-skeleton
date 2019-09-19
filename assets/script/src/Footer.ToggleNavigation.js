// navigation button for narrow devices
(function(d) {
    var btn = d.querySelector("#toggle-navigation"),
        html = d.querySelector("html"),
        actCls = "header-overlay-active",
        inactCls = "header-overlay-inactive",
        isActive = false;

    var setActive = function() {
        html.classList.remove(inactCls);
        html.classList.add(actCls);
        d.removeEventListener("click", setInactive);
        isActive = true;
    };
    var setInactive = function() {
        html.classList.remove(actCls);
        html.classList.add(inactCls);
        d.addEventListener("click", setInactive);
        isActive = false;
    };
    btn.addEventListener(
        "click",
        function(e) {
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
