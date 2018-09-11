import APIService from './API-service';

class ArticleService {
  constructor() {
    this.APIServiceInstance = new APIService();
    this.model = 'articles';
  }

  async getArticles() {
    return this.APIServiceInstance.get(this.model);
  }
}

export default ArticleService;
