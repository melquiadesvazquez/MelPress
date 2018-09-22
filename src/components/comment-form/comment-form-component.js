import ModelService from 'services/model-service';
import { reportValidity, getFormData } from 'utils/html';
import PubSub from 'pubsub-js';

const addCustomValidation = (input) => {
  if (input.value === input.value.toUpperCase()) {
    input.setCustomValidity('All capital letters not valid');
  } else {
    input.setCustomValidity('');
  }
};

const addErrorClass = (input) => {
  if (!input.checkValidity()) {
    input.classList.add('error');
  } else {
    input.classList.remove('error');
  }
};

const handleValidation = (formInputs) => {
  for (let i = 0; i < formInputs.length; i += 1) {
    const input = formInputs[i];

    input.addEventListener('focus', () => {
      input.classList.add('focus');
    });

    input.addEventListener('blur', () => {
      input.classList.remove('focus');
      addCustomValidation(input);
      addErrorClass(input);
    });
  }
};

export const updateCommentForm = (post) => {
  const commentForm = document.getElementById('comment-form');
  const submitFormButton = document.getElementById('comment-submit');
  const formInputs = commentForm.getElementsByClassName('form-control');
  const notice = document.getElementById('notice');

  handleValidation(formInputs);

  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitFormButton.disable = true;
    reportValidity(commentForm);
    if (commentForm.checkValidity()) {
      const ModelServiceInstance = new ModelService('comments');
      ModelServiceInstance.postModel(Object.assign({
        post, publishedAt: new Date().toISOString()
      }, getFormData(formInputs))).then(
        (response) => {
          if (response === true) {
            commentForm.reset();
            PubSub.publish('reloadComments');
            notice.innerHTML = 'Comment sent';

            setTimeout(() => { notice.innerHTML = ''; }, 3000);
          }
        }
      );
      submitFormButton.disable = false;
    }
  });
};

export default updateCommentForm;
