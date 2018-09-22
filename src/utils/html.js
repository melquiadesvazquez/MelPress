export const appendComponent = (parent, components) => {
  components.forEach((component) => {
    parent.appendChild(component);
  });
};

export const formatDate = (tdate) => {
  let systemDate = new Date(Date.parse(tdate));
  const userDate = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'];

  if (navigator.userAgent.match(/MSIE\s([^;]*)/)) {
    systemDate = Date.parse(tdate.replace(/( \+)/, ' UTC$1'));
  }

  let result = `${systemDate.getDate()} ${months[systemDate.getMonth()]}, ${systemDate.getFullYear()}`;
  const diff = Math.floor((userDate - systemDate) / 1000);

  if (diff <= 1) {
    result = 'just now';
  } else if (diff < 20) {
    result = `${diff} seconds ago`;
  } else if (diff < 40) {
    result = 'half a minute ago';
  } else if (diff < 60) {
    result = 'less than a minute ago';
  } else if (diff <= 90) {
    result = 'one minute ago';
  } else if (diff <= 3540) {
    result = `${Math.round(diff / 60)} minutes ago`;
  } else if (diff <= 5400) {
    result = '1 hour ago';
  } else if (diff <= 86400) {
    result = `${Math.round(diff / 3600)} hours ago`;
  }

  return result;
};

export const reportValidity = (form) => {
  if (HTMLFormElement.prototype.reportValidity) {
    form.reportValidity();
  } else {
    HTMLFormElement.prototype.reportValidity = () => {
      if (form.checkValidity()) return true;
      const btn = document.createElement('button');
      form.appendChild(btn);
      btn.click();
      form.removeChild(btn);
      return false;
    };
  }
};

export const getFormData = (formInputs) => {
  const formData = {};
  for (let i = 0; i < formInputs.length; i += 1) {
    const input = formInputs[i];
    formData[input.name] = input.value;
  }
  return formData;
};

export const countOccurences = (array) => array.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {}); // eslint-disable-line


export default {
  appendComponent,
  formatDate,
  reportValidity,
  getFormData,
  countOccurences
};
