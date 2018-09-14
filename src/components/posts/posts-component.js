import { appendComponent } from 'utils/html';
import { createPost } from 'components/post/post-component';
import PostService from 'services/post-service';

const loadPosts = (postsJson, posts) => {
  const updatedPosts = posts;
  if (postsJson.length === 0) {
    updatedPosts.innerHTML = 'No posts';
  } else {
    appendComponent(updatedPosts,
      postsJson.map(postData => createPost(postData)));
  }
};

export const updatePosts = () => {
  const postsServiceInstance = new PostService();
  const posts = document.getElementById('posts');
  posts.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  postsServiceInstance.getPosts().then((postsJson) => {
    posts.innerHTML = '';
    loadPosts(postsJson, posts);
  }).catch(() => {
    posts.innerHTML = 'There was an error, please reload';
  });
};

export const createPosts = () => {
  const posts = document.getElementById('posts');
  updatePosts();

  return posts;
};

export default {
  createPosts
};
