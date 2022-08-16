import { useEffect, useState } from "react"

import style from "./style.module.scss"

type ClockArrowProp = {
  className: string
  rotationDeg: number | null
}
const ClockArrow = ({ className, rotationDeg }: ClockArrowProp) => (
  <div
    className={className}
    style={{ transform: `rotate(${rotationDeg}deg)` }}
  ></div>
)
type ArrowTypes = "hour" | "minute" | "second"
type ArrowRotationsType = {
  [key in ArrowTypes]: null | number
}
export const Clock = () => {
  const [arrowRotations, setArrowRotations] = useState<ArrowRotationsType>({
    hour: null,
    minute: null,
    second: null
  })
  useEffect(() => {
    const setDate = () => {
      const today = new Date()

      const seconds = today.getSeconds()
      const second = (seconds / 60) * 360 + 360
      const minutes = today.getMinutes()
      const minute = (minutes / 60) * 360
      const hours = today.getHours()
      const hour = (hours / 12) * 360
      setArrowRotations({ second, minute, hour })
    }
    setInterval(setDate, 1000)
  }, [])
  const isMounting = !Object.values(arrowRotations).some(Boolean)
  if (isMounting) return <div>Mounting the clock</div>
  return (
    <div className={style.clockContainer}>
      <div className={style.center}></div>
      <ClockArrow
        className={style.hourArrow}
        rotationDeg={arrowRotations.hour}
      />
      <ClockArrow
        className={style.minuteArrow}
        rotationDeg={arrowRotations.minute}
      />
      <ClockArrow
        className={style.secondArrow}
        rotationDeg={arrowRotations.second}
      />

      <div className={style.clockFace}>
        {Array(12)
          .fill(null)
          .map((_, index) => (
            <span className={style.hourIndex} key={index}>
              {index + 1}
            </span>
          ))}
      </div>
    </div>
  )
}
