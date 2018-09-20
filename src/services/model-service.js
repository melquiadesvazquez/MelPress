import APIService from './API-service';

class ModelService {
  constructor(model) {
    this.APIServiceInstance = new APIService();
    this.model = model;
  }

  async getModels(filter) {
    const auxFilter = filter || false;
    let result;
    if (auxFilter === false) {
      result = this.APIServiceInstance.get(this.model);
    } else {
      result = this.APIServiceInstance.get(`${this.model}?${auxFilter.map(id => `id=${id}`).join('&')}`);
    }
    return result;
  }

  async getModel(id) {
    return this.APIServiceInstance.get(`${this.model}/${id}`);
  }

  async postModel(object) {
    return this.APIServiceInstance.post(object, this.model);
  }
}

export default ModelService;
