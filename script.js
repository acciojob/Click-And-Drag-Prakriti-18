// Your code here.
const container = document.getElementById('container');
const cubes = document.querySelectorAll('.cube');

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

/* 🔥 STEP 1: Place cubes in grid with initial positions */
const GAP = 10;
const CUBE_SIZE = 100;
const COLS = 4;

cubes.forEach((cube, index) => {
  const row = Math.floor(index / COLS);
  const col = index % COLS;

  const left = col * (CUBE_SIZE + GAP);
  const top = row * (CUBE_SIZE + GAP);

  cube.style.left = left + 'px';
  cube.style.top = top + 'px';
});

/* 🔥 STEP 2: Drag logic */
cubes.forEach(cube => {
  cube.addEventListener('mousedown', (e) => {
    activeCube = cube;
    cube.style.cursor = 'grabbing';

    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });
});

document.addEventListener('mousemove', (e) => {
  if (!activeCube) return;

  const containerRect = container.getBoundingClientRect();
  const cubeRect = activeCube.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  /* 🔒 Boundary conditions */
  x = Math.max(0, Math.min(x, containerRect.width - cubeRect.width));
  y = Math.max(0, Math.min(y, containerRect.height - cubeRect.height));

  activeCube.style.left = x + 'px';
  activeCube.style.top = y + 'px';
});

document.addEventListener('mouseup', () => {
  if (activeCube) {
    activeCube.style.cursor = 'grab';
    activeCube = null;
  }
});
