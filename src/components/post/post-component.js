import fallbackPostImgUrl from 'assets/defaultPostImage.jpg';
import fallbackAuthorImgUrl from 'assets/defaultAuthorImage.jpg';
import { getImageUrl } from 'components/image/image-component';
import { getVideoUrl } from 'components/video/video-component';
import { formatDate } from 'utils/html';
import ModelService from 'services/model-service';

export const createPost = async ({
  id, author, title, description, postImage, postVideo, publishedAt, comments
} = { title: 'No title', author: 'No author' }, index) => {
  const authorServiceInstance = new ModelService('authors');
  const { authorName, authorImage } = await authorServiceInstance.getModel(author);
  const image = postImage !== undefined ? getImageUrl(postImage, '480') : fallbackPostImgUrl;
  const authorImageAux = authorImage !== undefined ? getImageUrl(authorImage, '480') : fallbackAuthorImgUrl;
  const video = postVideo !== undefined ? getVideoUrl(postVideo, '480') : false;

  const mediaHTML = (video === false)
    ? `<figure class="post-col post-img">
        <a class="post-link" href="/post/?id=${id}"><img src="${image}" alt="${title}"></a>
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

  const date = formatDate(publishedAt);
  const post = document.createElement('article');

  post.classList.add('post');
  if (index % 2 !== 0) post.classList.add('post-right');
  post.innerHTML = `
    ${mediaHTML}
    <div class="post-col post-body">
      <header>
        <h2 class="post-title">${title}</h2>
        <p class="post-text">${description}</p>
        <p><a class="post-link" href="/post/?id=${id}">Continue reading</a></p>
      </header>
      <footer>
        <figure class="post-author-img">
        <img src="${authorImageAux}" alt="${authorName}">
        </figure>
        <p>
          <span class="post-author-name">${authorName}</span> | 
          <time class="post-time" datetime="${publishedAt}">${date}</time> | 
          0 Comments
        </p> 
      </footer>
    </div>
  `;

  return post;
};

export default {
  createPost
};
