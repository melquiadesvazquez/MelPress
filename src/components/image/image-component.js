import fallbackPostImgUrlSm from 'assets/defaultPostImage-sm.jpg';
import fallbackPostImgUrlLg from 'assets/defaultPostImage-lg.jpg';
import fallbackPostImgUrlXl from 'assets/defaultPostImage-xl.jpg';
import fallbackAuthorImgUrl from 'assets/defaultAuthorImage.jpg';

// Replaces the url of picsum with the size received
export const getSrcBySize = (src, size) => {
  const sizes = {
    xs: [200, 200], sm: [480, 270], lg: [960, 540], xl: [1440, 810]
  };
  return src.replace(/photos\/[0-9]+\/[0-9]+/, `photos/${sizes[size][0]}/${sizes[size][1]}`);
};

// Generates the html code from a picsum.photos url
export const getImageHTML = ({
  src, title = '', model = 'author', id = '', link = false, size = 'sm'
} = {}) => {
  let auxClass = 'post-author-img';
  const auxSrc = (src !== undefined) ? getSrcBySize(src, size) : fallbackAuthorImgUrl;
  let auxImage = `<img src="${auxSrc}" alt="${title}">`;

  if (model === 'post') {
    const fallbackPostImgUrl = {
      sm: fallbackPostImgUrlSm, lg: fallbackPostImgUrlLg, xl: fallbackPostImgUrlXl
    };
    auxClass = 'post-col post-img';
    if (src === undefined) {
      auxImage = `<img src="${fallbackPostImgUrl[size]}" srcset="${fallbackPostImgUrl.sm} 480w, ${fallbackPostImgUrl.lg} 960w, ${fallbackPostImgUrl.xl} 1440w" alt="${title}">`;
    } else {
      auxImage = `<img src="${auxSrc}" srcset="${getSrcBySize(auxSrc, 'sm')} 480w, ${getSrcBySize(auxSrc, 'lg')} 960w, ${getSrcBySize(auxSrc, 'xl')} 1440w" alt="${title}">`;
    }
    if (link) auxImage = `<a href="/post/?id=${id}">${auxImage}</a>`;
  }

  return `<figure class="${auxClass}">
          ${auxImage}
        </figure>`;
};

export default {
  getImageHTML
};
