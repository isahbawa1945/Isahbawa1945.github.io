// ===============================
// Mobile Navigation Menu
// ===============================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// ===============================
// Close Menu After Clicking a Link
// ===============================

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});

// ===============================
// Smooth Scroll Effect
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

// ===============================
// Fade Animation on Scroll
// ===============================

const cards = document.querySelectorAll(
".card,.class-card,.stat-card,.gallery-item,.news-card"
);

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

});

cards.forEach(card=>{

card.style.opacity="0";

card.style.transform="translateY(30px)";

card.style.transition="all .6s ease";

observer.observe(card);

});

// ===============================
// Current Year in Footer
// ===============================

const year = new Date().getFullYear();

const footer = document.querySelector("footer p:last-child");

if(footer){

footer.innerHTML = `© ${year} Madarasatul Arkanul Islam Wadirasatul Islamiyya. All Rights Reserved.`;

}

console.log("Website Loaded Successfully");