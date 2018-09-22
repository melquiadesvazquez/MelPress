const handleHamburgerClick = () => {
  const menu = document.getElementById('menuTop');
  const hamburgerLink = document.getElementById('menuBtn');
  hamburgerLink.addEventListener('click', (e) => {
    e.preventDefault();
    menu.classList.toggle('active');
  });
};

export const updateHeader = () => {
  handleHamburgerClick();
};

export default {
  updateHeader
};
