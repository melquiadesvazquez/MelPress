import { formatDate } from 'utils/html';

// Creates the content of a comment
export const createComment = async ({
  name, surname, title, description, publishedAt
} = { title: 'No title', author: 'No author' }) => {
  const date = formatDate(publishedAt);
  const comment = document.createElement('article');
  comment.classList.add('comment');

  comment.innerHTML = `
      <header>
        <h3 class="comment-title">${title}</h3>
        <p class="comment-text">${description}</p>
      </header>
      <footer>
        <p>
          <span class="comment-author-name">${name} ${surname}</span> | 
          <time class="comment-time" datetime="${publishedAt}">${date}</time>
        </p> 
      </footer>
  `;

  return comment;
};

export default {
  createComment
};
