export const BASE_URL = 'http://164.90.161.80:3000/api/content';

export const fetchData = async (dirId) => {
  const url = new URL(BASE_URL);

  if (dirId) {
    url.search = new URLSearchParams({dirId}).toString();
  }

  const response = await fetch(url.toString());
  const data = await response.json();
  return data;
}
