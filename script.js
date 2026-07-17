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

// ================= WELCOME POPUP =================

const enterBtn = document.getElementById("enterWebsite");
const popup = document.getElementById("welcomePopup");

if (enterBtn && popup) {

    enterBtn.addEventListener("click", () => {

        popup.style.display = "none";

    });

}

// ================= LIVE CLOCK =================

function updateClock() {

    const now = new Date();

    document.getElementById("digitalClock").innerHTML =
        "🕒 " + now.toLocaleTimeString();

    document.getElementById("gregorianDate").innerHTML =
        "📅 " + now.toDateString();

}

setInterval(updateClock, 1000);

updateClock();

// ================= HIJRI DATE & PRAYER TIMES =================

fetch("https://api.aladhan.com/v1/timingsByCity?city=Minna&country=Nigeria&method=2")
.then(response => response.json())
.then(data => {

    const hijri = data.data.date.hijri;

    document.getElementById("hijriDate").innerHTML =
        "🌙 " + hijri.day + " " + hijri.month.en + " " + hijri.year + " AH";

    document.getElementById("prayerTimes").innerHTML =
        "🕌 Fajr: " + data.data.timings.Fajr +
        " | Dhuhr: " + data.data.timings.Dhuhr +
        " | Asr: " + data.data.timings.Asr +
        " | Maghrib: " + data.data.timings.Maghrib +
        " | Isha: " + data.data.timings.Isha;

})
.catch(error => {
    console.log(error);

    document.getElementById("hijriDate").innerHTML =
        "🌙 Hijri date unavailable";

    document.getElementById("prayerTimes").innerHTML =
        "🕌 Prayer times unavailable";
});