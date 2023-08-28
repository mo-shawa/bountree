import { useEffect, useState } from "react"

export default function CountdownTimer() {
  const [value, setValue] = useState(35)

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((value) => value - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="countdown absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform font-mono text-6xl ">
      {value > -2 ? (
        /* @ts-ignore */
        <span style={{ "--value": value }}></span>
      ) : (
        "..."
      )}
    </span>
  )
}
