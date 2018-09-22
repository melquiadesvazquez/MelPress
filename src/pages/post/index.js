import { updateHeader } from 'components/header/header-component';
import { createPost } from 'components/post-detail/post-detail-component';
import queryString from 'query-string';
import 'styles/main.scss';

const query = queryString.parse(window.location.search);
const postId = query && query.id;

if (postId) createPost(postId);
updateHeader();
