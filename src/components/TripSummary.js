import React from "react"
import "../styles/tripsummary.scss"

const TripSummary = ({
  departure,
  arrival,
  fullName,
  specie,
  dateDeparture,
  dateArrival,
  flightType,
  showTripSummary,
  setShowTripSummary,
  seatNumber
}) => {
  return (
    <div className={showTripSummary ? "summary summary--active" : "summary"}>
      <span
        className="summary__close"
        onClick={() => setShowTripSummary(false)}
      />
      <div className="summary__container">
        <h1>YOUR TRIP TO {arrival}</h1>
        <h4>Personal information</h4>
        <div className="summary__box">
          <h5>Name: </h5>
          <p>{fullName}</p>
          <h5>Specie:</h5>
          <p>{specie}</p>
        </div>
        <h4>DEPARTING FLIGHT</h4>
        <div className="summary__box">
          <h5>From: </h5>
          <p>{departure}</p>
          <h5>To:</h5>
          <p>{arrival}</p>
          <h5>Date:</h5>
          <p>{dateDeparture}</p>
          <h5>Seat Number:</h5>
          <p>{seatNumber}</p>
        </div>
        {flightType === "round-trip" && (
          <>
            <h4>RETURN FLIGHT</h4>
            <div className="summary__box">
              <h5>From: </h5>
              <p>{arrival}</p>
              <h5>To:</h5>
              <p>{departure}</p>
              <h5>Date:</h5>
              <p>{dateArrival}</p>
              <h5>Seat Number:</h5>
              <p>{seatNumber}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default TripSummary
