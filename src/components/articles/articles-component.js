import { appendComponent } from 'utils/utils';
import { createArticle } from 'components/article/article-component';
import ArticleService from 'services/article-service';

export const createArticles = () => {
  const articles = document.getElementById('articles');
  const articlesServiceInstance = new ArticleService();
  articles.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  articlesServiceInstance.getArticles().then((articlesJson) => {
    articles.innerHTML = '';
    if (articlesJson.length === 0) {
      articles.innerHTML = 'No articles';
    } else {
      appendComponent(articles,
        articlesJson.map(articleData => createArticle(articleData)));
    }
  }).catch(() => {
    articles.innerHTML = 'There was an error, please reload';
  });
  return articles;
};

export default createArticles;
