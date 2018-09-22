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
      result = this.APIServiceInstance.get(`${this.model}?${filter}`);
    }
    return result;
  }

  async getModel(id) {
    return this.APIServiceInstance.get(`${this.model}/${id}`);
  }

  async postModel(object) {
    return this.APIServiceInstance.post(object, this.model);
  }

  async updateModel(object, id) {
    return this.APIServiceInstance.update(object, `${this.model}/${id}`);
  }
}

export default ModelService;
