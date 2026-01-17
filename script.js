const items = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

let activeItem = null;
let offsetX = 0;
let offsetY = 0;

/* 🔥 INITIAL GRID POSITIONS (IMPORTANT FOR CYPRESS) */
const SIZE = 100;
const GAP = 10;
const COLS = 4;

cubes.forEach((cube, index) => {
  const row = Math.floor(index / COLS);
  const col = index % COLS;

  cube.style.left = col * (SIZE + GAP) + 'px';
  cube.style.top = row * (SIZE + GAP) + 'px';
});

/* 🔥 DRAG START */
cubes.forEach(cube => {
  cube.addEventListener('mousedown', (e) => {
    activeItem = cube;

    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    cube.style.cursor = 'grabbing';
  });
});

/* 🔥 DRAG MOVE */
document.addEventListener('mousemove', (e) => {
  if (!activeItem) return;

  const containerRect = items.getBoundingClientRect();
  const itemRect = activeItem.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  /* 🔒 BOUNDARY CONSTRAINTS */
  x = Math.max(0, Math.min(x, containerRect.width - itemRect.width));
  y = Math.max(0, Math.min(y, containerRect.height - itemRect.height));

  activeItem.style.left = x + 'px';
  activeItem.style.top = y + 'px';
});

/* 🔥 DRAG END */
document.addEventListener('mouseup', () => {
  if (activeItem) {
    activeItem.style.cursor = 'grab';
    activeItem = null;
  }
});
