import fallbackPostImgUrl from 'assets/defaultPostImage.jpg';
import fallbackAuthorImgUrl from 'assets/defaultAuthorImage.jpg';
import { getImageUrl } from 'components/image/image-component';
import { getVideoUrl } from 'components/video/video-component';
import { createComments } from 'components/comments/comments-component';
import { formatDate } from 'utils/html';
import ModelService from 'services/model-service';

export const updatePostDetail = async ({
  id, author, title, content, postImage, postVideo, publishedAt, comments
} = { title: 'No title', author: 'No author' }) => {
  const authorServiceInstance = new ModelService('authors');
  const { authorName, authorImage } = await authorServiceInstance.getModel(author);

  const image = postImage !== undefined ? getImageUrl(postImage, '480') : fallbackPostImgUrl;
  const authorImageAux = authorImage !== undefined ? getImageUrl(authorImage, '480') : fallbackAuthorImgUrl;
  const video = postVideo !== undefined ? getVideoUrl(postVideo, '960') : false;
  const date = formatDate(publishedAt);
  const wrapper = document.getElementById('post');

  const mediaHTML = (video === false)
    ? `<figure class="post-col post-img">
        <img src="${image}" alt="${title}">
      </figure>`
    : `<div class="post-col post-video">
        <div class="post-video-wrapper">
          <iframe src="${video}"
            frameborder="0" 
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen>
          </iframe>
        </div>
      </div>`;

  wrapper.innerHTML = `
    <article class="post">
      ${mediaHTML}
      <div class="post-col post-body">
        <header>
          <h2 class="post-title">${title}</h2>
          <p class="post-text">${content}</p>
        </header>
        <footer>
          <figure class="post-author-img">
            <img src="${authorImageAux}" alt="${authorName}">
          </figure>
          <p>
            <span class="post-author-name">${authorName}</span> | 
            <time class="post-time" datetime="${publishedAt}">${date}</time>
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
