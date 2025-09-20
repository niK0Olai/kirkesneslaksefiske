//hamburger menu
document.addEventListener("DOMContentLoaded", function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('show');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
      });
    });
  }
});


//Map Lightbox
document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById('map-lightbox-modal');
    const modalImg = document.getElementById('map-lightbox-img');
    const sonekartImg = document.getElementById('sonekart-img');
    if (modal && modalImg && sonekartImg) {
      sonekartImg.addEventListener('click', function() {
        modal.style.display = 'flex';
        modalImg.src = this.src;
        modalImg.alt = this.alt;
      });
      modal.addEventListener('click', function() {
        modal.style.display = 'none';
        modalImg.src = '';
      });
    }
  });


// Image Lightbox
const modal = document.getElementById('lightbox-modal');
const modalImg = document.getElementById('lightbox-img');

// Target both .gallery img and .english-gallery img
document.querySelectorAll('.gallery img, .english-gallery img').forEach(img => {
  img.addEventListener('click', function() {
    modal.style.display = 'flex';
    modalImg.src = this.src;
    modalImg.alt = this.alt;
  });
});

// Close modal on click
modal.addEventListener('click', function() {
  modal.style.display = 'none';
  modalImg.src = '';
});

// Cookie Banner Functionality
document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = banner.querySelector(".cookie-accept");
  const declineBtn = banner.querySelector(".cookie-decline");

  // Sjekk om bruker har valgt før
  if (!localStorage.getItem("cookie-consent")) {
    banner.style.display = "block";
  }

  // Godta cookies
  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookie-consent", "accepted");
    banner.style.display = "none";
    loadAnalytics();
  });

  // Avslå cookies
  declineBtn.addEventListener("click", () => {
    localStorage.setItem("cookie-consent", "declined");
    banner.style.display = "none";
  });

  // Hvis tidligere godtatt → last GA direkte
  if (localStorage.getItem("cookie-consent") === "accepted") {
    loadAnalytics();
  }
});

// Funksjon for å laste Google Analytics
function loadAnalytics() {
  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-CRXQZST8E5";
  script.async = true;
  document.head.appendChild(script);

  script.onload = function() {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-CRXQZST8E5', { anonymize_ip: true });
  };
}



    //FORM SUBMISSION
  document.getElementById("dataForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const input = e.target.elements.data.value;
    
    const response = await fetch("/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input })
    });

    const result = await response.text();
    alert("Server says: " + result);
});
