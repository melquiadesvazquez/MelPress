export const appendComponent = (parent, components) => {
  components.forEach((component) => {
    parent.appendChild(component);
  });
};

export const sleep = time => new Promise(response => setTimeout(response, time));

export default {
  appendComponent
};
