export const makeImage = (title, alt, src) => {
  const src1x = src;
  const src2x = src;
  const src3x = src;
  const image = document.createElement('img');

  image.title = title;
  image.alt = alt;
  image.src = src1x;
  image.srcset = `${src1x} 1x,
                  ${src2x} 2x,
                  ${src3x} 3x`;
  return image;
};

export const getImageUrl = (src, size) => {
  // const auxSize = (size !== 'undefined')? `-${size}` : '';
  // const imgName = src.replace(/\.[^/.]+$/, '');
  // const auxExtension = src.replace(/^[^/.]+/, '');

  return src;
};

export default {
  makeImage,
  getImageUrl
};
