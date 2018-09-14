export const makeImage = (title, alt, src1x, src2x, src3x) => {
  const image = document.createElement('img');
  image.title = title;
  image.alt = alt;
  image.src = src1x;
  image.srcset = `${src1x} 1x,
                  ${src2x} 2x,
                  ${src3x} 3x`;
  return image;
};

export default {
  makeImage
};
