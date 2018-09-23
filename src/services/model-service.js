import APIService from './API-service';

class ModelService {
  constructor(model) {
    this.APIServiceInstance = new APIService();
    this.model = model;
  }

  // Gets all the elements from a collection, a filter '<attribute>=<value>' parameter is optional
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

  // Gets a single element with a specific id
  async getModel(id) {
    return this.APIServiceInstance.get(`${this.model}/${id}`);
  }

  // Creates an element
  async postModel(object) {
    return this.APIServiceInstance.post(object, this.model);
  }

  // Updates an element
  async updateModel(object, id) {
    return this.APIServiceInstance.update(object, `${this.model}/${id}`);
  }
}

export default ModelService;
