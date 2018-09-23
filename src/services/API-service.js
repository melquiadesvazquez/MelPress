class APIService {
  constructor() {
    // Depending on the environment a different JSON server will be used,
    // the settings can be changed on the .env file
    this.baseUrl = `${process.env.DEMO_API_PROTOCOL}://${process.env.DEMO_API_HOST}${process.env.DEMO_API_PORT}${process.env.DEMO_API_BASE}/`;
    if (process.env.NODE_ENV !== 'development') {
      // The live server used is http://my-json-server.typicode.com/melquiadesvazquez/MelPress/posts/
      this.baseUrl = `${process.env.LIVE_API_PROTOCOL}://${process.env.LIVE_API_HOST}${process.env.LIVE_API_PORT}${process.env.LIVE_API_BASE}/`;
    }
  }

  // GET CRUD operation
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

  // POST CRUD operation
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

  // PUT CRUD operation
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
