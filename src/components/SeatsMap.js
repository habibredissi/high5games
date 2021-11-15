import React from "react"
import "../styles/seatsmap.scss"
const SeatsMap = ({ spaceshipName, setSeatNumber }) => {
  const handleClick = (e) => {
    const seatNumber = e.target.id
    if (seatNumber) setSeatNumber(seatNumber)

    const checkboxes = document.querySelectorAll('input[type="checkbox"]')
    checkboxes.forEach((item) => {
      if (item.id !== seatNumber) item.checked = false
    })
  }
  return (
    <div>
      <div className="plane">
        <div className="cockpit">
          <h1>{spaceshipName}</h1>
        </div>
        <div className="exit exit--front fuselage"></div>
        <ol className="cabin fuselage" onClick={(e) => handleClick(e)}>
          <li className="row row--1">
            <ol className="seats" type="A">
              <li className="seat">
                <input type="checkbox" id="1A" />
                <label htmlFor="1A">1A</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="1B" />
                <label htmlFor="1B">1B</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="1C" />
                <label htmlFor="1C">1C</label>
              </li>
              <li className="seat">
                <input type="checkbox" disabled id="1D" />
                <label htmlFor="1D">Occupied</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="1E" />
                <label htmlFor="1E">1E</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="1F" />
                <label htmlFor="1F">1F</label>
              </li>
            </ol>
          </li>
          <li className="row row--2">
            <ol className="seats" type="A">
              <li className="seat">
                <input type="checkbox" id="2A" />
                <label htmlFor="2A">2A</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="2B" />
                <label htmlFor="2B">2B</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="2C" />
                <label htmlFor="2C">2C</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="2D" />
                <label htmlFor="2D">2D</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="2E" />
                <label htmlFor="2E">2E</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="2F" />
                <label htmlFor="2F">2F</label>
              </li>
            </ol>
          </li>
          <li className="row row--3">
            <ol className="seats" type="A">
              <li className="seat">
                <input type="checkbox" id="3A" />
                <label htmlFor="3A">3A</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="3B" />
                <label htmlFor="3B">3B</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="3C" />
                <label htmlFor="3C">3C</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="3D" />
                <label htmlFor="3D">3D</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="3E" />
                <label htmlFor="3E">3E</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="3F" />
                <label htmlFor="3F">3F</label>
              </li>
            </ol>
          </li>
          <li className="row row--4">
            <ol className="seats" type="A">
              <li className="seat">
                <input type="checkbox" id="4A" />
                <label htmlFor="4A">4A</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="4B" />
                <label htmlFor="4B">4B</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="4C" />
                <label htmlFor="4C">4C</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="4D" />
                <label htmlFor="4D">4D</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="4E" />
                <label htmlFor="4E">4E</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="4F" />
                <label htmlFor="4F">4F</label>
              </li>
            </ol>
          </li>
          <li className="row row--5">
            <ol className="seats" type="A">
              <li className="seat">
                <input type="checkbox" id="5A" />
                <label htmlFor="5A">5A</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="5B" />
                <label htmlFor="5B">5B</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="5C" />
                <label htmlFor="5C">5C</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="5D" />
                <label htmlFor="5D">5D</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="5E" />
                <label htmlFor="5E">5E</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="5F" />
                <label htmlFor="5F">5F</label>
              </li>
            </ol>
          </li>
          <li className="row row--6">
            <ol className="seats" type="A">
              <li className="seat">
                <input type="checkbox" id="6A" />
                <label htmlFor="6A">6A</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="6B" />
                <label htmlFor="6B">6B</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="6C" />
                <label htmlFor="6C">6C</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="6D" />
                <label htmlFor="6D">6D</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="6E" />
                <label htmlFor="6E">6E</label>
              </li>
              <li className="seat">
                <input type="checkbox" id="6F" />
                <label htmlFor="6F">6F</label>
              </li>
            </ol>
          </li>
        </ol>
        <div className="exit exit--back fuselage"></div>
      </div>
    </div>
  )
}

export default SeatsMap
