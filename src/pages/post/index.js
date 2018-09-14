import { updateHeader } from 'components/header/header-component';
import { updatePostDetail } from 'components/post-detail/post-detail-component';
import queryString from 'query-string';
import PostService from 'services/post-service';
import 'styles/main.scss';

const PostServiceInstance = new PostService();
const query = queryString.parse(window.location.search);
const postId = query && query.id;

if (postId) {
  PostServiceInstance.getPost(postId).then((postJSON) => {
    updatePostDetail(postJSON);
  });
}
updateHeader({ title: 'Post - Detail', active: 'post-detail' });
