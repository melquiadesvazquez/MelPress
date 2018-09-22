import { appendComponent } from 'utils/html';
import { createComment } from 'components/comment/comment-component';
import ModelService from 'services/model-service';

const loadComments = (json, comments) => {
  const wrapper = comments;
  if (json.length === 0) {
    wrapper.innerHTML = '<article class="comment">No comments yet</article>';
  } else {
    const promises = json.map(
      data => createComment(data).then(response => response)
    );
    Promise.all(promises).then((results) => {
      appendComponent(wrapper, results);
    });
  }
};

export const updateComments = (comments, id) => {
  const wrapper = comments;
  const ModelServiceInstance = new ModelService('comments');
  wrapper.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  ModelServiceInstance.getModels(`post=${id}`).then((json) => {
    wrapper.innerHTML = '';
    loadComments(json, wrapper);
  }).catch(() => {
    wrapper.innerHTML = 'There was an error, please reload';
  });
};

export const createComments = (id) => {
  const comments = document.getElementById('comments');
  updateComments(comments, id);

  return comments;
};

export default {
  createComments
};
