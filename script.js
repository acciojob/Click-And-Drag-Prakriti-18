// Your code here.
const container = document.querySelector('.items');
  const cubes = document.querySelectorAll('.item');

  let activeCube = null;
  let offsetX = 0;
  let offsetY = 0;

  cubes.forEach(cube => {
    // Make cubes absolutely positioned after load
    const rect = cube.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    cube.style.position = 'absolute';
    cube.style.left = rect.left - containerRect.left + container.scrollLeft + 'px';
    cube.style.top = rect.top - containerRect.top + 'px';

    cube.addEventListener('mousedown', (e) => {
      activeCube = cube;
      container.classList.add('active');

      const cubeRect = cube.getBoundingClientRect();

      offsetX = e.clientX - cubeRect.left;
      offsetY = e.clientY - cubeRect.top;

      cube.style.zIndex = 1000;
      e.preventDefault();
    });
  });

  document.addEventListener('mousemove', (e) => {
    if (!activeCube) return;

    const containerRect = container.getBoundingClientRect();

    let newX = e.clientX - containerRect.left - offsetX + container.scrollLeft;
    let newY = e.clientY - containerRect.top - offsetY;

    // Boundary constraints
    const maxX = container.scrollWidth - activeCube.offsetWidth;
    const maxY = container.clientHeight - activeCube.offsetHeight;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    activeCube.style.left = newX + 'px';
    activeCube.style.top = newY + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (activeCube) {
      activeCube.style.zIndex = 1;
    }
    activeCube = null;
    container.classList.remove('active');
  });