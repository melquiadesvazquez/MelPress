import natureImg1x from 'assets/nature-500.jpg';
import natureImg2x from 'assets/nature-700.jpg';
import natureImg3x from 'assets/nature-1000.jpg';

export const makeImage = () => {
  const image = document.createElement('img');
  image.title = 'Big Image';
  image.alt = 'Big Image';
  image.src = natureImg1x;
  image.srcset = `${natureImg1x} 1x,
               ${natureImg2x} 2x,
               ${natureImg3x} 3x`;
  return image;
};

export default {
  makeImage
};
