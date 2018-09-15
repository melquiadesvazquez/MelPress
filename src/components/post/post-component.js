import meeseeksUrl from 'assets/nature-500.jpg';

export const createPost = ({
  source, author, title, description, urlToImage, publishedAt
} = { title: 'No title', author: 'No author' }) => {
  const { id, name } = source;
  const image = urlToImage !== null ? urlToImage : meeseeksUrl;
  const post = document.createElement('div');
  
  post.classList.add('col-md-6');
  post.innerHTML = `
    <div class="card shadow-sm">
      <img class="card-img-top" src="${image}" alt="${title}">
      <div class="card-body">
        <strong class="d-inline-block mb-2 text-primary">${name}</strong>
        <h5 class="card-title">${title}</h5>
        <div class="mb-1 text-muted">${author}</div>
        <div class="mb-1 text-muted">${publishedAt}</div>
        <p class="card-text">${description}</p>
        <a href="/post/?id=${id}" class="btn btn-primary">Continue reading</a>
      </div>
    </div>
  `;

  return post;
};

export default {
  createPost
};
