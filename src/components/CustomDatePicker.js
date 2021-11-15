import React, { useEffect, useState } from "react"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

const CustomDatePicker = ({ flightType, dateType, setDates, dates }) => {
  const now = new Date()
  const nextDays = now.setDate(now.getDate() + 7)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date(nextDays))

  /** Handle arrival or departure date change */
  const handleDateChange = (date) => {
    dateType === "departure" ? setStartDate(date) : setEndDate(date)
    const newDates = { ...dates }
    newDates[dateType] = date.toLocaleDateString("en-US")
    setDates(newDates)
  }

  /** Initialize the defaul dates for departure and arrival */
  useEffect(() => {
    setDates({
      departure: startDate.toLocaleDateString("en-US"),
      arrival: endDate.toLocaleDateString("en-US")
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <DatePicker
      selected={
        flightType === "oneway"
          ? null
          : dateType === "arrival"
          ? endDate
          : startDate
      }
      disabled={flightType === "oneway" ? true : false}
      placeholderText="(One way)"
      minDate={new Date()}
      onChange={(date) => handleDateChange(date)}
    />
  )
}

export default CustomDatePicker
