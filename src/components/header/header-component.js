const updateTitle = (title) => {
  const titleElement = document.getElementById('title');
  titleElement.innerHTML = title;
};

export const updateHeader = ({ title }) => {
  updateTitle(title);
};

export default {
  updateHeader
};
