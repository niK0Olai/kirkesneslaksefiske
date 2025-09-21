// ========== HAMBURGER MENU ==========
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
      });
    });
  }
});


// ========== MAP LIGHTBOX ==========
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("map-lightbox-modal");
  const modalImg = document.getElementById("map-lightbox-img");
  const sonekartImg = document.getElementById("sonekart-img");

  if (modal && modalImg && sonekartImg) {
    sonekartImg.addEventListener("click", function() {
      modal.style.display = "flex";
      modalImg.src = this.src;
      modalImg.alt = this.alt;
    });

    modal.addEventListener("click", () => {
      modal.style.display = "none";
      modalImg.src = "";
    });
  }
});


// ========== IMAGE LIGHTBOX ==========
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("lightbox-modal");
  const modalImg = document.getElementById("lightbox-img");

  if (modal && modalImg) {
    document.querySelectorAll(".gallery img, .english-gallery img").forEach(img => {
      img.addEventListener("click", function() {
        modal.style.display = "flex";
        modalImg.src = this.src;
        modalImg.alt = this.alt;
      });
    });

    modal.addEventListener("click", () => {
      modal.style.display = "none";
      modalImg.src = "";
    });
  }
});


// ========== COOKIE BANNER ==========
document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  if (banner) {
    const acceptBtn = banner.querySelector(".cookie-accept");
    const declineBtn = banner.querySelector(".cookie-decline");

    if (!localStorage.getItem("cookie-consent")) {
      banner.style.display = "block";
    }

    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("cookie-consent", "accepted");
      banner.style.display = "none";
      loadAnalytics();
    });

    declineBtn.addEventListener("click", () => {
      localStorage.setItem("cookie-consent", "declined");
      banner.style.display = "none";
    });

    if (localStorage.getItem("cookie-consent") === "accepted") {
      loadAnalytics();
    }
  }
});


// ========== GOOGLE ANALYTICS ==========
function loadAnalytics() {
  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-CRXQZST8E5";
  script.async = true;
  document.head.appendChild(script);

  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag("js", new Date());
    gtag("config", "G-CRXQZST8E5", { anonymize_ip: true });
  };
}

// ========== VISITOR COUNTER ==========
document.addEventListener("DOMContentLoaded", () => {
  fetch("counter.php")
    .then(response => response.json())
    .then(data => {
      console.log("Antall i dag:", data.today);
      console.log("Alle dager:", data.all);
    })
    .catch(err => console.error("Feil i counter:", err));
});

// ========== FORM SUBMISSION ==========
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("dataForm");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const input = e.target.elements.data.value;

      try {
        const response = await fetch("/process", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input })
        });

        const result = await response.text();
        alert("Server says: " + result);
      } catch (err) {
        console.error("Error sending form:", err);
        alert("Noe gikk galt – prøv igjen senere.");
      }
    });
  }
});


