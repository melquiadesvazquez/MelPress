class APIService {
  constructor() {
    this.baseUrl = `${process.env.DEMO_API_PROTOCOL}://${process.env.DEMO_API_HOST}${process.env.DEMO_API_PORT}${process.env.DEMO_API_BASE}/`;
    if (process.env.NODE_ENV !== 'development') {
      this.baseUrl = `${process.env.LIVE_API_PROTOCOL}://${process.env.LIVE_API_HOST}${process.env.LIVE_API_PORT}${process.env.LIVE_API_BASE}/`;
    }
  }

  async get(uri) {
    try {
      const response = await fetch(`${this.baseUrl}${uri}`);

      if (!response.ok) {
        throw Error(response.statusText);
      }

      return response.json();
    } catch (error) {
      console.warn('Error', error); // eslint-disable-line no-console
      return { error };
    }
  }

  async post(body, uri) {
    try {
      const response = await fetch(`${this.baseUrl}${uri}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw Error(response.statusText);
      }

      return true;
    } catch (error) {
      console.warn('Error', error); // eslint-disable-line no-console
      return { error };
    }
  }

  async update(body, uri) {
    try {
      const response = await fetch(`${this.baseUrl}${uri}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw Error(response.statusText);
      }

      return true;
    } catch (error) {
      console.warn('Error', error); // eslint-disable-line no-console
      return { error };
    }
  }
}

export default APIService;
