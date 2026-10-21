// PERSONALISE THESE VALUES before publishing.
const CONTACT_EMAIL = "prithvinp42@gmail.com";
const GITHUB_URL = "https://github.com/";
const LINKEDIN_URL = "https://www.linkedin.com/";

const roles = ["WEB DEVELOPER", "IT FRESHER", "PYTHON DEVELOPER", "AI / ML ENTHUSIAST"];
const typingText = document.getElementById("typingText");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {
  const role = roles[roleIndex];
  typingText.textContent = role.slice(0, charIndex);
  if (!deleting && charIndex < role.length) {
    charIndex++;
    setTimeout(typeRole, 95);
  } else if (!deleting) {
    deleting = true;
    setTimeout(typeRole, 1350);
  } else if (charIndex > 0) {
    charIndex--;
    setTimeout(typeRole, 38);
  } else {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 250);
  }
}
typeRole();

document.getElementById("year").textContent = new Date().getFullYear();

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Project category filtering
const filterButtons = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");
filterButtons.forEach(button => button.addEventListener("click", () => {
  filterButtons.forEach(item => item.classList.toggle("active", item === button));
  const category = button.dataset.filter;
  projectCards.forEach(card => {
    card.hidden = category !== "all" && card.dataset.category !== category;
  });
}));

// Project details dialog
const projectDetails = {
  traffic: {
    title: "Traffic Sign AI",
    description: "A traffic-sign image classification project using a CNN model, with a Flask web interface for uploading an image and viewing a prediction. The existing portfolio notes describe Python, CNN, Jupyter Notebook and machine learning; the current project work also uses TensorFlow/Keras and Flask.",
    tags: ["Python", "TensorFlow / Keras", "CNN", "Flask", "Image classification"]
  },
  crm: {
    title: "CRM System",
    description: "A customer relationship management concept for organising customer details and business records in a simple interface. Add screenshots and a repository link when available.",
    tags: ["HTML", "CSS", "JavaScript", "MySQL"]
  },
  intrusion: {
    title: "Online Intrusion Alert Aggregation",
    description: "A Java project concept for collecting and organising intrusion-related alerts from different sources to support easier monitoring and review.",
    tags: ["Java", "Database", "Security"]
  },
  noise: {
    title: "Noise Pollution Monitoring",
    description: "An IoT monitoring concept using sensors and a connected dashboard to observe environmental noise levels.",
    tags: ["ESP32", "Blynk", "Sensors", "IoT"]
  },
  alarm: {
    title: "Anti-Sleeping Alarm",
    description: "An Arduino-based driver-safety concept intended to detect possible drowsiness and trigger an alert. Describe the exact sensor and detection method used in your implementation before publishing.",
    tags: ["Arduino Uno", "Sensors", "Buzzer"]
  },
  tunewave: {
    title: "TuneWave Music App",
    description: "A music-streaming interface concept focused on presenting music content through a modern, responsive frontend.",
    tags: ["HTML", "CSS", "JavaScript", "React.js"]
  }
};
const dialog = document.getElementById("projectDialog");
document.querySelectorAll(".details-button").forEach(button => button.addEventListener("click", () => {
  const item = projectDetails[button.dataset.project];
  document.getElementById("dialogTitle").textContent = item.title;
  document.getElementById("dialogDescription").textContent = item.description;
  const tagBox = document.getElementById("dialogTags");
  tagBox.replaceChildren(...item.tags.map(tag => {
    const span = document.createElement("span");
    span.textContent = tag;
    return span;
  }));
  dialog.showModal();
}));
document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

// Contact form: prepares an email in the visitor's mail app; it does not send from a server.

document.getElementById("emailLink").href = `mailto:${CONTACT_EMAIL}`;
document.getElementById("emailLink").textContent = `${CONTACT_EMAIL} ↗`;

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();

  const form = event.target;
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("formStatus");

  if (!name || !email || !subject || !message) {
    status.textContent = "Please complete every field.";
    return;
  }

  if (CONTACT_EMAIL === "yourmail@example.com") {
    status.textContent = "Please configure your email address first.";
    return;
  }

  const body = `Name: ${name}\nReply email: ${email}\n\n${message}`;
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Prepare and open the email
  window.location.href = mailto;

  // Reset the contact form
  form.reset();
  status.textContent = "";
});




/* ==================================
   PRITHVIN.P - 3D MOUSE INTERACTIONS
================================== */

(() => {
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const desktopPointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    if (reduceMotion || !desktopPointer) {
        return;
    }

    /* HERO 3D MOVEMENT */
    const hero = document.querySelector(".hero-art");

    if (hero) {
        const objects = hero.querySelectorAll(
            ".orb, .orbit, .art-card, .floating-tag, .art-cross"
        );

        hero.addEventListener("pointermove", (event) => {
            const rect = hero.getBoundingClientRect();

            const mouseX =
                (event.clientX - rect.left) / rect.width - 0.5;

            const mouseY =
                (event.clientY - rect.top) / rect.height - 0.5;

            hero.style.transform = `
                rotateY(${mouseX * 12}deg)
                rotateX(${-mouseY * 10}deg)
            `;

            objects.forEach((object, index) => {
                const depth = (index + 1) * 5;

                object.style.translate = `
                    ${mouseX * depth}px
                    ${mouseY * depth}px
                `;
            });
        });

        hero.addEventListener("pointerleave", () => {
            hero.style.transform = "";

            objects.forEach((object) => {
                object.style.translate = "";
            });
        });
    }

    /* 3D PROJECT AND SKILL CARDS */
    const cards = document.querySelectorAll(
        ".project-card, .skill-card"
    );

    cards.forEach((card) => {
        card.addEventListener("pointermove", (event) => {
            const rect = card.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) / rect.width - 0.5;

            const y =
                (event.clientY - rect.top) / rect.height - 0.5;

            card.style.transform = `
                perspective(1000px)
                rotateY(${x * 10}deg)
                rotateX(${-y * 8}deg)
                translateY(-4px)
            `;
        });

        card.addEventListener("pointerleave", () => {
            card.style.transform = "";
        });
    });
})();



/* ===== PRITHVIN.P DARK NEON SMOKE ===== */

(() => {
if (
window.matchMedia("(hover: none), (pointer: coarse)").matches ||
window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
return;
}

let lastX = 0;
let lastY = 0;
let lastSpawn = 0;

const MAX_PARTICLES = 60;
let particleCount = 0;

window.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;

    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;
    const distance = Math.hypot(dx, dy);
    const now = performance.now();

    if (distance < 5 || now - lastSpawn < 15) return;

    lastX = event.clientX;
    lastY = event.clientY;
    lastSpawn = now;

    if (particleCount >= MAX_PARTICLES) return;

    const particle = document.createElement("span");
    particle.className = "smoke-particle";

    const size = 25 + Math.random() * 40;
    const driftX = (Math.random() - 0.5) * 65;
    const driftY = -10 - Math.random() * 45;

    particle.style.left = event.clientX + "px";
    particle.style.top = event.clientY + "px";

    particle.style.setProperty("--smoke-size", size + "px");
    particle.style.setProperty("--drift-x", driftX + "px");
    particle.style.setProperty("--drift-y", driftY + "px");

    const colors = [
        ["#00f5ff", "#0064ff"],
        ["#7700ff", "#b000ff"],
        ["#005aff", "#6400ff"]
    ];

    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.background = `
        radial-gradient(
            circle,
            ${color[0]} 0%,
            ${color[1]} 28%,
            rgba(35, 0, 70, 0.65) 55%,
            transparent 100%
        )
    `;

    document.body.appendChild(particle);
    particleCount++;

    particle.addEventListener("animationend", () => {
        particle.remove();
        particleCount--;
    }, { once: true });

}, { passive: true });


})();
