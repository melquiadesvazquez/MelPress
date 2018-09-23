// Handles the mobile "hamburger" menu
const handleHamburgerClick = () => {
  const menu = document.getElementById('menuTop');
  const hamburgerLink = document.getElementById('menuBtn');
  hamburgerLink.addEventListener('click', (e) => {
    e.preventDefault();
    menu.classList.toggle('active');
  });
};

// For the future, other functions related with the header will be added here
export const updateHeader = () => {
  handleHamburgerClick();
};

export default {
  updateHeader
};
