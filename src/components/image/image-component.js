import fallbackPostImgUrl from 'assets/defaultPostImage.jpg';
import fallbackAuthorImgUrl from 'assets/defaultAuthorImage.jpg';

export const getImageHTML = ({
  src, title = '', model = 'author', id = '', size = ''
} = {}) => {
  // const auxSize = (size !== 'undefined')? `-${size}` : '';
  // const imgName = src.replace(/\.[^/.]+$/, '');
  // const auxExtension = src.replace(/^[^/.]+/, '');

  let auxClass = 'post-author-img';
  let auxSrc = (src !== undefined) ? src : fallbackAuthorImgUrl;
  let auxImage = `<img src="${auxSrc}" alt="${title}">`;

  console.log(auxImage)

  if (model === 'post') {
    auxClass = 'post-col post-img';
    auxSrc = (src !== undefined) ? src : fallbackPostImgUrl;
    auxImage = `<a class="post-link" href="/post/?id=${id}"><img src="${auxSrc}" alt="${title}"></a>`;
  }

  return `<figure class="${auxClass}">
          ${auxImage}
        </figure>`;
};

export default {
  getImageHTML
};
