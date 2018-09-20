import { getImageHTML } from 'components/image/image-component';
import { getVideoHTML } from 'components/video/video-component';
import { createComments } from 'components/comments/comments-component';
import { formatDate } from 'utils/html';
import ModelService from 'services/model-service';

export const updatePostDetail = async ({
  id, author = 'No author', comments = [], title = 'No title', content, postImage, postVideo, publishedAt
} = {}) => {
  const authorServiceInstance = new ModelService('authors');
  const { authorName, authorImage } = await authorServiceInstance.getModel(author);
  const authorImageHTML = getImageHTML({ src: authorImage, title: authorName });

  const image = getImageHTML({
    src: postImage, title, model: 'post', id
  });
  const video = getVideoHTML(postVideo);
  const mediaHTML = (video === false) ? image : video;

  const date = formatDate(publishedAt);
  const wrapper = document.getElementById('post');

  wrapper.innerHTML = `
    <article class="post">
      ${mediaHTML}
      <div class="post-col post-body">
        <header>
          <h2 class="post-title">${title}</h2>
          <p class="post-text">${content}</p>
        </header>
        <footer>
          ${authorImageHTML}
          <p>
            <span class="post-author-name">${authorName}</span> | 
            <time class="post-time" datetime="${publishedAt}">${date}</time> | 
            <a href="#"><i class="fa fa-heart"></i> 19</a>
          </p>          
        </footer>
      </div>
    </article>
  `;

  createComments(comments);
};

export default {
  updatePostDetail
};
