import { createPosts } from 'components/posts/posts-component';
import { updateHeader } from 'components/header/header-component';
import 'styles/main.scss';

createPosts();
updateHeader({ active: 'home' });
