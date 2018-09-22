import { appendComponent, countOccurences } from 'utils/html';
import { createPost } from 'components/post/post-component';
import ModelService from 'services/model-service';

const loadPosts = (json, posts) => {
  const updatedPosts = posts;
  if (json.length === 0) {
    updatedPosts.innerHTML = 'Posts could not be loaded';
  } else {
    const ModelServiceInstance = new ModelService('comments');
    ModelServiceInstance.getModels().then((jsonComments) => {
      const countComments = countOccurences(jsonComments.map(comment => comment.post));

      const promises = json.map(
        (data, index) => createPost(data, countComments, index).then(response => response)
      );
      Promise.all(promises).then(results => appendComponent(updatedPosts, results));
    }).catch(() => {
      updatedPosts.innerHTML = 'Posts could not be loaded';
    });
  }
};

export const updatePosts = (posts) => {
  const wrapper = posts;
  const ModelServiceInstance = new ModelService('posts');

  wrapper.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  ModelServiceInstance.getModels().then((json) => {
    wrapper.innerHTML = '';
    loadPosts(json, wrapper);
  }).catch(() => {
    wrapper.innerHTML = 'There was an error, please reload';
  });
};

export const createPosts = () => {
  const posts = document.getElementById('posts');
  updatePosts(posts);

  return posts;
};

export default {
  createPosts
};
