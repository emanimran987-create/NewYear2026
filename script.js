// ===== ELEMENTS =====
const startBtn = document.getElementById("startBtn");
const hero = document.querySelector(".hero");
const content = document.querySelector(".content");
const finalSection = document.querySelector(".final");
const reveals = document.querySelectorAll(".reveal");

const earlyMsg = document.querySelector(".early-msg");
const countdownElement = document.querySelector(".countdown");

const secretBtn = document.querySelector(".interactive-btn");
const secretMsg = document.querySelector(".secret");

const finalText = document.querySelector(".final-text");
const endBtn = document.getElementById("endBtn");

// ===== DATE (CHANGE YEAR IF NEEDED) =====
const countdownTarget = new Date("2026-01-01T00:00:00").getTime();
let countdownInterval = null;

// ===== INITIAL STATE =====
hero.classList.add("hidden");
content.classList.add("hidden");
finalSection.classList.add("hidden");
earlyMsg.classList.add("hidden");
finalText.style.display = "none";
endBtn.style.display = "none";

// ===== COUNTDOWN CHECK =====
function startCountdownCheck() {
  const now = Date.now();
  const distance = countdownTarget - now;

  if (distance > 0) {
    // BEFORE NEW YEAR
    earlyMsg.classList.remove("hidden");
    finalSection.classList.remove("hidden");
    hero.classList.add("hidden");
    content.classList.add("hidden");

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
  } else {
    // AFTER NEW YEAR
    earlyMsg.classList.add("hidden");
    finalSection.classList.add("hidden");
    hero.classList.remove("hidden");
  }
}

// ===== COUNTDOWN FORMAT =====
function formatTime(ms) {
  const d = Math.floor(ms / (1000 * 60 * 60 * 24));
  const h = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const m = Math.floor((ms / (1000 * 60)) % 60);
  const s = Math.floor((ms / 1000) % 60);
  return `${d}d ${h}h ${m}m ${s}s`;
}

// ===== UPDATE COUNTDOWN =====
function updateCountdown() {
  const now = Date.now();
  const distance = countdownTarget - now;

  if (distance > 0) {
    countdownElement.textContent = formatTime(distance);
  } else {
    clearInterval(countdownInterval);
    countdownElement.textContent = "🎉 Happy New Year! 🎉";
    showFinalCountdownMessage();
  }
}

// ===== SHOW FINAL MESSAGE AFTER COUNTDOWN =====
function showFinalCountdownMessage() {
  finalText.style.display = "block";
  endBtn.style.display = "block";
}

// ===== START BUTTON =====
startBtn.addEventListener("click", () => {
  hero.classList.add("hidden");
  content.classList.remove("hidden");

  reveals.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("show");

      // SHOW END BUTTON AFTER LAST MESSAGE
      if (index === reveals.length - 1) {
        setTimeout(() => {
          endBtn.style.display = "block";
        }, 600);
      }
    }, index * 700);
  });
});

// ===== SECRET BUTTON =====
secretBtn.addEventListener("click", () => {
  secretMsg.classList.toggle("hidden");
});

// ===== END BUTTON =====
endBtn.addEventListener("click", () => {
  window.location.href = "next.html";
});

// ===== START EVERYTHING =====
startCountdownCheck();
