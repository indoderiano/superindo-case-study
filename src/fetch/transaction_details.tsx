import axios from 'axios';

export function getTransactionDetailsByTransactionId (access_token, transaction_id) {
  // axios.get(`${API_URL}/transaction-detail/transaction-id/${transaction_id}`)

  let fetch = axios.create({
    method: "GET",
    baseURL: `${process.env.REACT_APP_API}/transaction-detail/transaction-id/${transaction_id}`,
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  })

  return fetch
}
