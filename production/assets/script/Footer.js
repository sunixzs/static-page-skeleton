var isTouchDevice=function(){return"ontouchstart"in window||0<navigator.maxTouchPoints||0<navigator.msMaxTouchPoints||window.DocumentTouch&&document instanceof DocumentTouch};document.querySelector("html").classList.add(isTouchDevice()?"touchevents":"no-touchevents"),function(t){var e=t.querySelector("#toggle-navigation"),i=t.querySelector("html"),o="header-overlay-active",n="header-overlay-inactive",r=!1,s=function(){i.classList.remove(o),i.classList.add(n),t.addEventListener("click",s),r=!1};e.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),r?s():(i.classList.remove(n),i.classList.add(o),t.removeEventListener("click",s),r=!0)},!1),t.addEventListener("click",function(){r&&s()})}(document),require(["lib/intersection-observer"],function(){var e=document.querySelectorAll("nav.main a");if(e.length){for(var n={},t=[],i=new IntersectionObserver(function(e){for(var t=0,i=null,o=0;o<e.length;o++)!0===e[o].isIntersecting&&e[o].intersectionRatio>t&&(t=e[o].intersectionRatio,i=e[o]);!function(e){if(e){var t=e.target.hasAttribute("id")?e.target.getAttribute("id"):"";if(!t)return;for(var i in n)if(i===t)for(var o=0;o<n[i].links.length;o++)n[i].links[o].classList.add("active");else for(o=0;o<n[i].links.length;o++)n[i].links[o].classList.remove("active")}}(i)},{threshold:.5}),o=0;o<e.length;o++){var r=e[o].hasAttribute("href")&&e[o].getAttribute("href").split("#")[1]?e[o].getAttribute("href").split("#")[1]:"";if(r){var s=document.querySelector("#"+r);s&&(t.push(s),i.observe(s),n.id?n.id.links.push(e[o]):n[r]={section:s,links:[e[o]]})}}t.length||i.disconnect()}}),function(t,e){var i=!1,o=!1,n=e.querySelector("html");t.addEventListener("scroll",function(e){i||(t.requestAnimationFrame(function(){o&&t.scrollY<=0?(o=!1,n.classList.remove("page-is-scrolled"),n.classList.add("page-is-not-scrolled")):!o&&0<t.scrollY&&(o=!0,n.classList.remove("page-is-not-scrolled"),n.classList.add("page-is-scrolled")),i=!1}),i=!0)})}(window,document),function(i,o){if(location&&location.hash){var e=o.querySelector(location.hash);e&&setTimeout(function(){i.scrollTo({top:e.getBoundingClientRect().top+i.scrollY-145,behavior:"smooth"})},1e3)}for(var t=o.querySelectorAll("a"),n=0;n<t.length;n++)if(t[n].hasAttribute("href")){var r=t[n].getAttribute("href").split("#")[1];r&&o.querySelector("#"+r)&&t[n].addEventListener("click",function(e){var t=this.getAttribute("href").split("#")[1];t&&o.querySelector("#"+t)&&(e.preventDefault(),i.scrollTo({top:o.querySelector("#"+t).getBoundingClientRect().top+i.scrollY-145,behavior:"smooth"}))},!1)}}(window,document);