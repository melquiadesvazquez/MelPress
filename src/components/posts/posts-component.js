import { appendComponent } from 'utils/html';
import { createPost } from 'components/post/post-component';
import ModelService from 'services/model-service';

const loadPosts = (json, posts) => {
  const updatedPosts = posts;
  if (json.length === 0) {
    updatedPosts.innerHTML = 'No posts';
  } else {
    const promises = json.map(
      (data, index) => createPost(data, index).then(response => response)
    );
    Promise.all(promises).then(results => appendComponent(updatedPosts, results));
  }
};

export const updatePosts = (posts) => {
  const wrapper = posts;
  const postsServiceInstance = new ModelService('posts');
  wrapper.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  postsServiceInstance.getModels().then((json) => {
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
