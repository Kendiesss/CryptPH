// lib/api.js

const COINMARKETCAP_API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';
const API_KEY = process.env.COINMARKETCAP_API_KEY; // Store your API key in an environment variable

export async function fetchCryptoDataByIds(ids) {
  try {
    const response = await fetch(`${COINMARKETCAP_API_URL}?id=${ids}`, {
      method: 'GET',
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
