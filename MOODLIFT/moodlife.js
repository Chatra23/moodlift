// Message Generator
const messages = {
  Quotes: ["Stay positive 💛", "You are amazing ✨", "Keep going 🌿"],
  "Self-Care": ["Drink water 💧", "Take a break 🛌", "Go outside 🌳"],
  Affirm: ["I am strong 💪", "I believe in myself 🌟"]
};

let currentType = "Quotes";

document.querySelectorAll(".tabs button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tabs button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentType = btn.innerText;
  });
});

document.getElementById("generateBtn").onclick = () => {
  const arr = messages[currentType];
  document.getElementById("message").innerText =
    arr[Math.floor(Math.random() * arr.length)];
};

// Breathing Animation
const circle = document.getElementById("circle");
const text = document.getElementById("breathText");

document.getElementById("breathBtn").onclick = () => {
  text.innerText = "Inhale...";
  circle.style.transform = "scale(1.5)";

  setTimeout(() => {
    text.innerText = "Hold...";
  }, 4000);

  setTimeout(() => {
    text.innerText = "Exhale...";
    circle.style.transform = "scale(1)";
  }, 6000);

  setTimeout(() => {
    text.innerText = "Repeat...";
  }, 10000);
};

// Joke
document.getElementById("jokeBtn").onclick = () => {
  const jokes = [
    "Why don’t skeletons fight? They don’t have guts 😂",
    "I told my laptop I needed a break… it froze 😆",
    "Parallel lines never meet… sad 😢"
  ];

  document.getElementById("joke").innerText =
    jokes[Math.floor(Math.random()*jokes.length)];
};

// Gratitude (LocalStorage)
const notesList = document.getElementById("notes");

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notesList.innerHTML = "";
  notes.forEach(n => {
    let li = document.createElement("li");
    li.innerText = n;
    notesList.appendChild(li);
  });
}

document.getElementById("addBtn").onclick = () => {
  let input = document.getElementById("noteInput");
  if(input.value.trim() === "") return;

  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push(input.value);
  localStorage.setItem("notes", JSON.stringify(notes));

  input.value = "";
  loadNotes();
};

loadNotes();