const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (event) => {
  if (event.code.toLowerCase() === 'space')
    setRandomColors();
});

document.addEventListener('click', (event) => {
  event.preventDefault();
  const type = event.target.dataset.type;
  if (type === 'lock') {
    const node = event.target.tagName.toLowerCase() === 'i' ?
      event.target : event.target.children[0];
    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if (type === 'copy') {
    copyToClipboard(event.target.textContent);
  }
});

function generateRandomColor() {
  const hexCodes = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }
  return "#" + color;
}

function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}

function setRandomColors() {
  const newColors = [];

  cols.forEach((col) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock');
    const text = col.querySelector("h2");
    const button = col.querySelector("button");

    if (isLocked) {
      newColors.push(text.textContent);
      return;
    }

    const color = chroma.random();
    newColors.push(color);

    text.textContent = color;
    col.style.background = color;

    setTextColor(text, color);
    setTextColor(button, color);
  });

  updateColorsHash(newColors);
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function updateColorsHash(colors = []) {
  document.location.hash = colors.map(col => col.toString().substring(1)).join('-');
}

setRandomColors(true);

