const hamburgerMenu = document.querySelector('.hamburger-menu');
const menuItems = document.querySelectorAll('.menu-item');
const hamburger = document.querySelector('.hamburger');
const closeIcon = document.querySelector('.fa-xmark');
const menuIcon = document.querySelector('.fa-bars');

function toggleMenu() {
    if (hamburgerMenu.classList.contains("showMenu")) {
        hamburgerMenu.classList.remove("showMenu");
        closeIcon.style.display = "none";
        menuIcon.style.display = "block";
    } else {
        hamburgerMenu.classList.add("showMenu");
        closeIcon.style.display = "block";
        menuIcon.style.display = "none";
    }
};

hamburger.addEventListener("click", toggleMenu);

menuItems.forEach(
    function(menuItem) {
        menuItem.addEventListener("click", toggleMenu);
    }
);