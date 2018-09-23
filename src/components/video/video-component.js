// Generates the html code from a youtube embedded video url
export const getVideoHTML = (src) => {
  let result = false;
  if (src !== undefined) {
    result = `<div class="post-col post-video">
                <div class="post-video-wrapper">
                  <iframe src="${src}?controls=0&showinfo=0&rel=0"
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
