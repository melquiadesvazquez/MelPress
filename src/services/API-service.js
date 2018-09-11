import { sleep } from 'utils/utils';

class APIService {
  constructor() {
    this.baseUrl = process.env.API_URL;
  }

  async get(uri) {
    try {
      const response = await fetch(`${this.baseUrl}${uri}`);
      await sleep(1000);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch (error) {
      console.warn('Error', error); // eslint-disable-line no-console
      return { error };
    }
  }
}

export default APIService;
