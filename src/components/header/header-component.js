const removeActiveClass = () => {
  const activeElement = document.getElementsByClassName('menu-active')[0];
  if (activeElement) activeElement.classList.remove('menu-active');
};

const addActiveClass = (active) => {
  const newActiveElement = document.getElementById(active);
  if (newActiveElement) newActiveElement.classList.add('menu-active');
};

const handleHamburgerClick = () => {
  const menu = document.getElementById('menuTop');
  const hamburgerLink = document.getElementById('menuBtn');
  hamburgerLink.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('-------------');
    menu.classList.toggle('active');
  });
};

export const updateHeader = ({ active }) => {
  handleHamburgerClick();
  removeActiveClass();
  addActiveClass(active);
};

export default {
  updateHeader
};
