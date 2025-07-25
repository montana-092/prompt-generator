// script.js - SUNO Prompt Generator

// Global option arrays
const genres = [
  "Pop","Rock","Jazz","EDM","Hip Hop","Classical","Lo-fi","Country","Reggae","Blues","Funk","Soul","Disco","Metal","Punk","Techno","House","Trance","Dubstep","Drum & Bass","Ambient","Folk","R&B","Latin","Ska","K-Pop","J-Pop","Gospel","Opera","World","Synthwave","Indie","Grunge"
];
const moods = [
  "Chill","Energetic","Dark","Happy","Sad","Epic","Uplifting","Melancholic","Romantic","Mysterious","Aggressive","Peaceful","Nostalgic","Dreamy","Groovy","Suspenseful","Playful","Relaxed","Inspiring","Majestic","Somber","Optimistic","Whimsical","Intense","Spooky","Bright","Calm","Funky","Cinematic","Ethereal"
];
const instruments = [
  "Guitar","Electric Guitar","Acoustic Guitar","Piano","Grand Piano","Synth","Drums","Violin","Saxophone","Bass Guitar","Double Bass","Trumpet","Trombone","Flute","Clarinet","Cello","Harp","Ukulele","Banjo","Mandolin","Accordion","Organ","Harmonica","Oboe","Tuba","French Horn","Percussion","Xylophone","Marimba","Steel Drums","Didgeridoo","Sitar","Shamisen","Koto","Bagpipes"
];

document.addEventListener("DOMContentLoaded", () => {
  // Populate select elements
  populateSelect("music", genres);
  populateSelect("mood", moods);
  populateSelect("instrument", instruments);

  // Enable click-only multi-select behavior for instrument list
  const instrumentSelect = document.getElementById("instrument");
  instrumentSelect.addEventListener("mousedown", (e) => {
    e.preventDefault();
    const option = e.target;
    option.selected = !option.selected;
  });

  document.getElementById("generateBtn").addEventListener("click", generatePrompt);
  document.getElementById("copyBtn").addEventListener("click", copyPrompt);
  document.getElementById("randomBtn").addEventListener("click", randomPrompt);
});

function populateSelect(id, options) {
  const select = document.getElementById(id);
  options.forEach(opt => {
    const option = document.createElement("option");
    option.value = opt;
    option.textContent = opt;
    select.appendChild(option);
  });
}

function generatePrompt() {
  const genre = document.getElementById("music").value;
  const mood = document.getElementById("mood").value;
  const instrumentSelect = document.getElementById("instrument");
  const instrumentsSelected = Array.from(instrumentSelect.selectedOptions).map(o => o.value);
  const bpm = document.getElementById("bpm").value || "";
  const vocals = document.getElementById("vocals").value;

  const parts = [
    genre,
    mood + " vibe",
    (instrumentsSelected.length ? `featuring ${instrumentsSelected.join(', ')}` : null),
    bpm ? `${bpm} BPM` : null,
    vocals
  ].filter(Boolean);

  const prompt = parts.join(" | ");
  const output = document.getElementById("output");
  output.value = prompt;
}

function randomPrompt() {
  // Pick random values
  document.getElementById("music").value = pickRandom(genres);
  document.getElementById("mood").value = pickRandom(moods);

  // Clear instrument selection then randomly pick up to 3 instruments
  const instrumentSelect = document.getElementById("instrument");
  Array.from(instrumentSelect.options).forEach(o => (o.selected = false));
  const randomInstruments = shuffleArray(instruments).slice(0, 3);
  Array.from(instrumentSelect.options).forEach(o => {
    if (randomInstruments.includes(o.value)) o.selected = true;
  });

  // Random BPM between 60 and 180
  document.getElementById("bpm").value = Math.floor(Math.random() * 121) + 60;

  // Random vocals
  const vocalsOpts = ["Male vocals", "Female vocals", "Instrumental"];
  document.getElementById("vocals").value = pickRandom(vocalsOpts);

  generatePrompt();
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function copyPrompt() {
  const output = document.getElementById("output");
  output.select();
  output.setSelectionRange(0, 99999); // For mobile
  document.execCommand("copy");

  const copyBtn = document.getElementById("copyBtn");
  copyBtn.textContent = "Copied!";
  setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
}
