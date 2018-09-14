import APIService from './API-service';

class PostService {
  constructor() {
    this.APIServiceInstance = new APIService();
    this.model = 'posts';
  }

  async getPosts() {
    return this.APIServiceInstance.get(this.model);
  }

  async getPost(id) {
    return this.APIServiceInstance.get(`${this.model}/${id}`);
  }

  async postPost(post) {
    return this.APIServiceInstance.post(post, this.model);
  }
}

export default PostService;
