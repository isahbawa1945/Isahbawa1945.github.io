// ======================================
// MOBILE NAVIGATION MENU
// ======================================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}

// ======================================
// CLOSE MENU AFTER CLICKING A LINK
// ======================================

const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {

    link.addEventListener("click", () => {

        if (navLinks) {

            navLinks.classList.remove("active");

        }

    });

});

// ======================================
// SMOOTH SCROLL
// ======================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

// ======================================
// FADE-IN ANIMATION
// ======================================

const cards = document.querySelectorAll(
".card,.class-card,.stat-card,.gallery-item,.news-card,.subject,.headteacher-card"
);

if (cards.length > 0) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    });

    cards.forEach(card => {

        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "all .6s ease";

        observer.observe(card);

    });

}

// ======================================
// FOOTER YEAR
// ======================================

const footer = document.querySelector("footer p:last-of-type");

if (footer) {

    footer.innerHTML =
`© ${new Date().getFullYear()} Madarasatul Arkanul Islam Wadirasatul Islamiyya. All Rights Reserved.`;

}

// ======================================
// WELCOME POPUP
// ======================================

const popup = document.getElementById("welcomePopup");
const enterBtn = document.getElementById("enterWebsite");

if (popup && enterBtn) {

    enterBtn.addEventListener("click", () => {

        popup.style.display = "none";

        localStorage.setItem("visited", "yes");

    });

    if (localStorage.getItem("visited") === "yes") {

        popup.style.display = "none";

    }

}

console.log("Website Loaded Successfully");

// ======================================
// LIVE DIGITAL CLOCK
// ======================================

function updateClock() {

    const now = new Date();

    const clock = document.getElementById("digitalClock");
    const gregorian = document.getElementById("gregorianDate");

    if (clock) {

        clock.innerHTML = "🕒 " +
        now.toLocaleTimeString("en-NG", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

    }

    if (gregorian) {

        gregorian.innerHTML = "📅 " +
        now.toDateString();

    }

}

updateClock();

setInterval(updateClock, 1000);

// ======================================
// HIJRI DATE & PRAYER TIMES
// ======================================

const hijriDate = document.getElementById("hijriDate");
const prayerTimes = document.getElementById("prayerTimes");

fetch("https://api.aladhan.com/v1/timingsByCity?city=Minna&country=Nigeria&method=2")

.then(response => response.json())

.then(data => {

    if (hijriDate) {

        hijriDate.innerHTML =
        "🌙 " +
        data.data.date.hijri.day +
        " " +
        data.data.date.hijri.month.en +
        " " +
        data.data.date.hijri.year +
        " AH";

    }

    if (prayerTimes) {

        const t = data.data.timings;

        prayerTimes.innerHTML =

        "🕌 " +

        "Fajr: " + t.Fajr +

        " | Sunrise: " + t.Sunrise +

        " | Dhuhr: " + t.Dhuhr +

        " | Asr: " + t.Asr +

        " | Maghrib: " + t.Maghrib +

        " | Isha: " + t.Isha;

    }

})

.catch(error => {

    console.log(error);

    if (hijriDate) {

        hijriDate.innerHTML = "🌙 Hijri date unavailable";

    }

    if (prayerTimes) {

        prayerTimes.innerHTML = "🕌 Prayer times unavailable";

    }

});

// ======================================
// BACK TO TOP BUTTON
// ======================================

// Create button
const topBtn = document.createElement("button");

topBtn.innerHTML = "⬆";

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

// Style button
topBtn.style.position = "fixed";
topBtn.style.bottom = "20px";
topBtn.style.right = "20px";
topBtn.style.width = "50px";
topBtn.style.height = "50px";
topBtn.style.border = "none";
topBtn.style.borderRadius = "50%";
topBtn.style.background = "#5b2c6f";
topBtn.style.color = "#fff";
topBtn.style.fontSize = "22px";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
topBtn.style.boxShadow = "0 5px 15px rgba(0,0,0,.3)";
topBtn.style.zIndex = "999";

// Show button when scrolling
window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

// Scroll to top
topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

// ======================================
// BUTTON HOVER EFFECT
// ======================================

document.querySelectorAll(".btn,.portal-btn,.status-btn").forEach(btn => {

    btn.addEventListener("mouseenter", () => {

        btn.style.transform = "scale(1.05)";

    });

    btn.addEventListener("mouseleave", () => {

        btn.style.transform = "scale(1)";

    });

});

// ======================================
// IMAGE FADE-IN
// ======================================

document.querySelectorAll("img").forEach(img => {

    img.onload = () => {

        img.style.opacity = "1";

    };

    img.style.opacity = "0";

    img.style.transition = "opacity .8s";

});

// ======================================
// CONSOLE MESSAGE
// ======================================

console.log("====================================");
console.log("Madarasatul Arkanul Islam");
console.log("Website Developed Successfully");
console.log("====================================");