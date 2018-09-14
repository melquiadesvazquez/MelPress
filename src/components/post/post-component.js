export const createPost = ({
  title, author, imageUrl, id
} = { title: 'No title', author: 'No author' }) => {
  const post = document.createElement('div');
  post.classList.add('post');
  post.innerHTML = `
    <a class="post-title" href="/post/?id=${id}">
      <img src="${imageUrl}" class="post-image" ></img>
    </a>
    <div>
      <a class="post-title" href="/post/?id=${id}">${title}</a>
    </div>
    <p class="post-author">${author}</p>
  `;

  return post;
};

export default {
  createPost
};
