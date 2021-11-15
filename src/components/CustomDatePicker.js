import React, { useState } from "react"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

const CustomDatePicker = ({ flightType, dateType, setDates }) => {
  const [startDate, setStartDate] = useState(new Date())
  const handleDateChange = (date) => {
    setStartDate(date)
    if (dateType === "departure") {
      setDates((oldValue) => ({ ...oldValue, departure: date.toString() }))
    } else if (dateType === "arrival") {
      setDates((oldValue) => ({ ...oldValue, arrival: date.toString() }))
    }
  }
  return (
    <DatePicker
      selected={flightType === "oneway" ? null : startDate}
      disabled={flightType === "oneway" ? true : false}
      placeholderText="(One way)"
      minDate={new Date()}
      onChange={(date) => handleDateChange(date)}
    />
  )
}

export default CustomDatePicker
