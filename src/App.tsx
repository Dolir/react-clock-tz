import { useEffect, useState } from "react"
import "./App.scss"
import { Clock } from "./clock"
import { getTime } from "./getTime"

function App() {
  const [currentDate, setCurrentDate] = useState<Date | null>(null)
  useEffect(() => {
    getTime().then((result) => {
      if (!result) return
      const newDate = new Date(
        new Date(result.data.datetime).toLocaleString("en-US", {
          timeZone: result.data.timezone
        })
      )
      setCurrentDate(newDate)
    })
  }, [])
  return (
    <div className="App">
      {currentDate ? (
        <Clock defaultDate={currentDate} />
      ) : (
        "Fetching current Date..."
      )}
      <div className="halfCircle"></div>
    </div>
  )
}

export default App
