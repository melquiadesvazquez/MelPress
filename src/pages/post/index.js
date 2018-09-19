import { updateHeader } from 'components/header/header-component';
import { updatePostDetail } from 'components/post-detail/post-detail-component';
import queryString from 'query-string';
import ModelService from 'services/model-service';
import 'styles/main.scss';

const PostServiceInstance = new ModelService('posts');
const query = queryString.parse(window.location.search);
const postId = query && query.id;

if (postId) {
  PostServiceInstance.getModel(postId).then((postJSON) => {
    updatePostDetail(postJSON);
  });
}
