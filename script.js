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
  populateInstrumentCheckboxes();

  document.getElementById("generateBtn").addEventListener("click", generatePrompt);
  document.getElementById("copyBtn").addEventListener("click", copyPrompt);
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

// Dynamically create checkbox list for instruments
function populateInstrumentCheckboxes() {
  const container = document.getElementById("instrument-list");
  instruments.forEach(inst => {
    const label = document.createElement("label");
    label.className = "flex items-center space-x-1";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = inst;
    checkbox.className = "accent-purple-500";
    label.appendChild(checkbox);
    const span = document.createElement("span");
    span.textContent = inst;
    label.appendChild(span);
    container.appendChild(label);
  });
}

function generatePrompt() {
  const genre = document.getElementById("music").value;
  const mood = document.getElementById("mood").value;
  const instrumentsSelected = Array.from(document.querySelectorAll('#instrument-list input:checked')).map(i => i.value);
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

function copyPrompt() {
  const output = document.getElementById("output");
  output.select();
  output.setSelectionRange(0, 99999); // For mobile
  document.execCommand("copy");

  const copyBtn = document.getElementById("copyBtn");
  copyBtn.textContent = "Copied!";
  setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
}
