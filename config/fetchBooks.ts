class Request {
  async fetchBooks<T>(url: string): Promise<T> {
    const response = await fetch(url);
    const res = await response.json();

    if (!response.ok) {
      throw new Error(`Get запрос не выполнился: ${response.statusText}`);
    }

    console.log('FETCH_BOOKS: RESPONSE', res)
    return res;
  }
}

export default Request;
