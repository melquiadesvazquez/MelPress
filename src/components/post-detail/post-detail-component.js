import { getImageHTML } from 'components/image/image-component';
import { getVideoHTML } from 'components/video/video-component';
import { createComments } from 'components/comments/comments-component';
import { updateCommentForm } from 'components/comment-form/comment-form-component';
import { formatDate } from 'utils/html';
import ModelService from 'services/model-service';
import PubSub from 'pubsub-js';

const isLiked = id => localStorage.getItem(`post-${id}`);

const toggleLike = (id, likes) => {
  let increment = 1;
  let liked = 'true';

  if (isLiked(id) === 'true') {
    increment = 0;
    liked = 'false';
  }

  localStorage.setItem(`post-${id}`, liked);
  document.querySelector('.post-likes-count').innerHTML = likes + increment;
};

const setInitialLikeValue = (likeButton, liked, likes) => {
  if (liked === 'true') {
    likeButton.classList.add('active');
    document.querySelector('.post-likes-count').innerHTML = likes + 1;
  }
};

export const loadPostDetail = async ({
  id, author = 'No author', likes = 0, title = 'No title', content = 'No content', postImage, postVideo, publishedAt
} = {}) => {
  const ModelServiceInstance = new ModelService('authors');
  const { authorName, authorImage } = await ModelServiceInstance.getModel(author);
  const authorImageHTML = getImageHTML({ src: authorImage, title: authorName });

  const image = getImageHTML({
    src: postImage, title, model: 'post', id
  });
  const video = getVideoHTML(postVideo);
  const mediaHTML = (video === false) ? image : video;

  const date = formatDate(publishedAt);
  const wrapper = document.getElementById('post');

  wrapper.innerHTML = `
    <article class="post post-detail">
      ${mediaHTML}
      <div class="post-col post-body">
        <header>
          <h2 class="post-title">${title}</h2>
          <div class="post-text">${content}</div>
          <p class="text-right"><a class="post-link" href="/">Back home</a></p>
        </header>
        <footer>
          ${authorImageHTML}
          <p>
            <span class="post-author-name">${authorName}</span> | 
            <time class="post-time" datetime="${publishedAt}">${date}</time> | 
            <button class="post-likes"><i class="fa fa-heart"></i> <span class="post-likes-count">${likes}</span></button>
          </p>          
        </footer>
      </div>
    </article>
  `;

  const likeButton = document.querySelector('.post-likes');

  setInitialLikeValue(likeButton, isLiked(id), likes);

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('active');
    toggleLike(id, likes);
  });

  PubSub.subscribe('reloadComments', () => {
    createComments(id);
  });

  updateCommentForm(id);
  PubSub.publish('reloadComments');
};

export const createPost = (id) => {
  const wrapper = document.getElementById('post');
  const ModelServiceInstance = new ModelService('posts');

  wrapper.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  ModelServiceInstance.getModel(id).then((postJSON) => {
    loadPostDetail(postJSON);
  });
};

export default {
  createPost
};
