function navReveal(){var e=document.querySelector(".nav"),a=e.offsetHeight;e.style.top=window.scrollY<a?"-"+(a+10)+"px":"0"}navReveal(),window.addEventListener("scroll",navReveal);