import fallbackPostImgUrl from 'assets/defaultPostImage.jpg';
import fallbackAuthorImgUrl from 'assets/defaultAuthorImage.jpg';

export const getImageHTML = ({
  src, title = '', model = 'author', id = '', link = false
} = {}) => {
  let auxClass = 'post-author-img';
  let auxSrc = (src !== undefined) ? src : fallbackAuthorImgUrl;
  let auxImage = `<img src="${auxSrc}" alt="${title}">`;

  if (model === 'post') {
    auxClass = 'post-col post-img';
    auxSrc = (src !== undefined) ? src : fallbackPostImgUrl;
    auxImage = `<img src="${auxSrc}" alt="${title}">`;
    if (link) {
      auxImage = `<a href="/post/?id=${id}"><img src="${auxSrc}" alt="${title}"></a>`;
    }
  }

  return `<figure class="${auxClass}">
          ${auxImage}
        </figure>`;
};

export default {
  getImageHTML
};
