import axios from "axios"

axios.defaults.baseURL = "https://" + process.env.REACT_APP_API_HOST

type GetTimeReturnValue = {
  abbreviation: string
  client_ip: string
  datetime: string
  day_of_week: number
  day_of_year: number
  dst: boolean
  dst_from: null | number
  dst_offset: number
  dst_until: null | number
  raw_offset: number
  timezone: string
  unixtime: number
  utc_datetime: string
  utc_offset: string
  week_number: number
}
export async function getTime() {
  const res = await axios
    .get<GetTimeReturnValue>(`/timezone/Europe/Moscow`, {
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY as string,
        "X-RapidAPI-Host": process.env.REACT_APP_API_HOST as string
      }
    })
    .catch(function (error) {
      console.error(error)
    })
  if (res) return res
}
