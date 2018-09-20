import { getImageHTML } from 'components/image/image-component';
import { getVideoHTML } from 'components/video/video-component';
import { formatDate } from 'utils/html';
import ModelService from 'services/model-service';

export const createPost = async ({
  id, author = 'No author', comments = [], title = 'No title', description, postImage, postVideo, publishedAt
} = {}, index) => {
  const authorServiceInstance = new ModelService('authors');
  const { authorName, authorImage } = await authorServiceInstance.getModel(author);
  const authorImageHTML = getImageHTML({ src: authorImage, title: authorName });

  const image = getImageHTML({
    src: postImage, title, model: 'post', id
  });
  const video = getVideoHTML(postVideo);
  const mediaHTML = (video === false) ? image : video;

  const date = formatDate(publishedAt);
  const wrapper = document.createElement('article');

  wrapper.classList.add('post');
  if (index % 2 !== 0) wrapper.classList.add('post-right');

  wrapper.innerHTML = `
    ${mediaHTML}
    <div class="post-col post-body">
      <header>
        <h2 class="post-title">${title}</h2>
        <p class="post-text">${description}</p>
        <p><a class="post-link" href="/post/?id=${id}">Continue reading</a></p>
      </header>
      <footer>
        ${authorImageHTML}
        <p>
          <span class="post-author-name">${authorName}</span> | 
          <time class="post-time" datetime="${publishedAt}">${date}</time> | 
          <a href="/post/?id=${id}#comments">${comments.length} Comments</a>
        </p> 
      </footer>
    </div>
  `;

  return wrapper;
};

export default {
  createPost
};
