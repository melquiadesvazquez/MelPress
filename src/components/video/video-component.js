export const getVideoHTML = (src) => {
  let result = false;
  if (src !== undefined) {
    result = `<div class="post-col post-video">
                <div class="post-video-wrapper">
                  <iframe src="${src}?title=0&byline=0&portrait=0"
                    frameborder="0" 
                    webkitallowfullscreen
                    mozallowfullscreen
                    allowfullscreen>
                  </iframe>
                </div>
              </div>`;
  }
  return result;
};

export default {
  getVideoHTML
};
