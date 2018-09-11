import './article-styles.scss';

export const createArticle = ({ title, author, imageUrl } = { title: 'No title', author: 'No author' }) => {
  const article = document.createElement('div');
  article.classList.add('article');
  article.innerHTML = `
    <img src="${imageUrl}" class="article-image" ></img>
    <p class="article-title">${title}</p>
    <p class="article-author">${author}</p>
  `;
  return article;
};

export default {
  createArticle
};
