import APIService from './API-service';

class ModelService {
  constructor(model) {
    this.APIServiceInstance = new APIService();
    this.model = model;
  }

  async getModels() {
    return this.APIServiceInstance.get(this.model);
  }

  async getModel(id) {
    return this.APIServiceInstance.get(`${this.model}/${id}`);
  }

  async postModel(object) {
    return this.APIServiceInstance.post(object, this.model);
  }
}

export default ModelService;
