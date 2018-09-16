import meeseeksUrl from 'assets/nature-500.jpg';

export const createPost = ({
  source, author, title, description, urlToImage, publishedAt
} = { title: 'No title', author: 'No author' }, index) => {
  const { id, name } = source;
  const image = urlToImage !== null ? urlToImage : meeseeksUrl;
  const post = document.createElement('div');

  post.classList.add('post');
  if (index % 2 !== 0) post.classList.add('post-right');
  post.innerHTML = `
    <div class="post-col post-img">
      <img src="${image}" alt="${title}">
    </div>
    <div class="post-col post-body">
      <strong class="d-inline-block mb-2 text-primary">${name}</strong>
      <h5 class="post-title">${title}</h5>
      <div class="mb-1 text-muted">${author}</div>
      <div class="mb-1 text-muted">${publishedAt}</div>
      <p class="post-text">${description}</p>
      <a href="/post/?id=${id}" class="btn btn-primary">Continue reading</a>
    </div>
  `;

  return post;
};

export default {
  createPost
};
