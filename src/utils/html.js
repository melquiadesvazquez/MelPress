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
  if (diff <= 1) { result = 'just now'; }
  if (diff < 20) { result = `${diff} seconds ago`; }
  if (diff < 40) { result = 'half a minute ago'; }
  if (diff < 60) { result = 'less than a minute ago'; }
  if (diff <= 90) { result = 'one minute ago'; }
  if (diff <= 3540) { result = `${Math.round(diff / 60)} minutes ago`; }
  if (diff <= 5400) { result = '1 hour ago'; }
  if (diff <= 86400) { result = `${Math.round(diff / 3600)} hours ago`; }

  return result;
};

export const sleep = time => new Promise(response => setTimeout(response, time));

export default {
  appendComponent
};
