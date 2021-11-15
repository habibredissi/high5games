import React from "react"

const FlightType = ({ flightType, setFlightType }) => {
  const handleCheckBoxChange = (e) => {
    setFlightType(e.target.value)
  }
  return (
    <div>
      <input
        type="radio"
        name="booking__checkbox"
        id="dot-1"
        value="round-trip"
        checked={flightType === "round-trip" ? true : false}
        onChange={handleCheckBoxChange}
      />
      <input
        type="radio"
        name="booking__checkbox"
        id="dot-2"
        value="oneway"
        checked={flightType === "oneway" ? true : false}
        onChange={handleCheckBoxChange}
      />
      <div className="booking__trip">
        <label htmlFor="dot-1">
          <span className="booking__dot booking__dot--one"></span>
          <span className="booking__checkbox">Round trip</span>
        </label>
        <label htmlFor="dot-2">
          <span className="booking__dot booking__dot--two"></span>
          <span className="booking__checkbox">One way</span>
        </label>
      </div>
    </div>
  )
}

export default FlightType
