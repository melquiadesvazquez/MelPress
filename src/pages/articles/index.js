import { updateHeader } from 'components/header/header-component';
import { createArticles } from 'components/articles/articles-component';

import 'styles/main.scss';

updateHeader({ title: 'Keep playing', active: 'home' });
createArticles();
