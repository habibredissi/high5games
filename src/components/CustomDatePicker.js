import React from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const CustomDatePicker = ({
  flightType,
  dateType,
  setDates,
  startDate,
  endDate
}) => {
  const handleDateChange = (date) => {
    if (dateType === "departure") {
      setDates((oldValue) => ({
        ...oldValue,
        departure: date.toLocaleDateString("en-US")
      }))
    } else if (dateType === "arrival") {
      setDates((oldValue) => ({
        ...oldValue,
        arrival: date.toLocaleDateString("en-US")
      }))
    }
  }

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
