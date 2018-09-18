import { appendComponent } from 'utils/html';
import { createPost } from 'components/post/post-component';
import ModelService from 'services/model-service';

const loadPosts = (postsJson, posts) => {
  const updatedPosts = posts;
  if (postsJson.length === 0) {
    updatedPosts.innerHTML = 'No posts';
  } else {
    const promises = postsJson.map(
      (postData, index) => createPost(postData, index).then(response => response)
    );
    Promise.all(promises).then(results => appendComponent(updatedPosts, results));
  }
};

export const updatePosts = () => {
  const postsServiceInstance = new ModelService('posts');
  const posts = document.getElementById('main');
  posts.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  postsServiceInstance.getModels().then((postsJson) => {
    posts.innerHTML = '';
    loadPosts(postsJson, posts);
  }).catch(() => {
    posts.innerHTML = 'There was an error, please reload';
  });
};

export const createPosts = () => {
  const posts = document.getElementById('main');
  updatePosts();

  return posts;
};

export default {
  createPosts
};
