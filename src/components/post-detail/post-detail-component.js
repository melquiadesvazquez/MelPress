import meeseeksUrl from 'assets/nature-500.jpg';

export const updatePostDetail = ({
  title, author, imageUrl, description, id
} = { title: 'No title', author: 'No author' }) => {
  const post = document.getElementById('post-detail');
  const descriptionDiv = description ? (
    `<div class="post-detail-description">
      ${description}
    </div>`
  ) : '';
  const image = imageUrl !== '' ? imageUrl : meeseeksUrl;
  post.innerHTML = `
    <div class="title-container">
      <h2 title="Post title" class="post-title">${title}</h2>
      <button id="like-button" class="like-button">
        <i class="far fa-heart"></i>
      </button>
    </div>
    <p title="Author" class="post-author">${author}</p>
    <img src="${image}" class="post-image" ></img>
    <div>
      <a title="back" class="back" href='javascript:history.back()'><- Go Back</a>
    </div>
    ${descriptionDiv}
  `;
};

export default {
  updatePostDetail
};
