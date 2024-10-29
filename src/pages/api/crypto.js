// pages/api/crypto.js

import { fetchCryptoDataByIds } from '../../lib/api';

export default async function handler(req, res) {
  const { ids } = req.query;

  if (!ids) {
    return res.status(400).json({ error: 'IDs are required' });
  }

  const data = await fetchCryptoDataByIds(ids);
  
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
