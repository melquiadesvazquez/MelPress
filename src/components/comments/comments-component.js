import { appendComponent } from 'utils/html';
import { createComment } from 'components/comment/comment-component';
import ModelService from 'services/model-service';

const loadComments = (json, comments) => {
  const wrapper = comments;
  if (json.length === 0) {
    wrapper.innerHTML = 'No comments';
  } else {
    const promises = json.map(
      data => createComment(data).then(response => response)
    );
    Promise.all(promises).then(results => appendComponent(wrapper, results));
  }
};

export const updateComments = (comments, ids) => {
  const wrapper = comments;
  const commentsServiceInstance = new ModelService('comments');
  wrapper.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  commentsServiceInstance.getModels(ids).then((json) => {
    wrapper.innerHTML = '';
    loadComments(json, wrapper);
  }).catch(() => {
    wrapper.innerHTML = 'There was an error, please reload';
  });
};

export const createComments = (ids) => {
  const comments = document.getElementById('comments');
  updateComments(comments, ids);

  return comments;
};

export default {
  createComments
};
