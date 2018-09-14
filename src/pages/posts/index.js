import { updateHeader } from 'components/header/header-component';
import { createPosts } from 'components/posts/posts-component';
import 'styles/main.scss';

updateHeader({ title: 'Posts' });
createPosts();
