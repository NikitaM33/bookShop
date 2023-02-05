class Request {
  constructor() {}

  async fetchBooks<T>(url: string): Promise<T> {
    const response = await fetch(url);
    const res = await response.json();

    if (!response.ok) {
      throw new Error(`Get запрос не выполнился: ${response.statusText}`);
    }

    console.log("RESPONSE", response);
    return res;
  }
}

export default Request;
