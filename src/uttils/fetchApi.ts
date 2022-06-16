import axios from "axios";
import queryString from "query-string"

export const getData = async (key: any) => {
  const apiUrl = process.env.API_URL || "http://localhost:3000"
  const parse = queryString.stringifyUrl({url: `${apiUrl}/api/cars`, query: key.queryKey[1]})
  const res = await axios.get(parse)

  return res.data
}
