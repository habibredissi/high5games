import { useState, useEffect } from "react"
import { getDataFromApi } from "./api/Request"
import "./App.css"
import CustomSelectSpecies from "./components/CustomSelectSpecies"
import CustomSelectPlanets from "./components/CustomSelectPlanets"
import CustomSelectSpaceShips from "./components/CustomSelectSpaceShips"
import CustomDatePicker from "./components/CustomDatePicker"
import { buildPlanetSpecies } from "./utilities/tools"
import FlightType from "./components/FlightType"
import SeatsMap from "./components/SeatsMap"
import TripSummary from "./components/TripSummary"

function App() {
  const [fullName, setFullName] = useState("")
  const [species, setSpecies] = useState({ list: [], selection: null })
  const [people, setPeople] = useState([])
  const [spaceships, setSpaceships] = useState({ list: [], selection: null })
  const [planets, setPlanets] = useState({
    list: [],
    departure: null,
    arrival: null
  })
  const [loadingPlanets, setLoadingPlanets] = useState(true)
  const [flightType, setFlightType] = useState("round-trip")
  const [dates, setDates] = useState({ departure: null, arrival: null })
  const [showTripSummary, setShowTripSummary] = useState(false)
  const [seatNumber, setSeatNumber] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      fullName === "" ||
      species.selection === null ||
      spaceships.selection === null ||
      planets.departure === null ||
      planets.arrival === null ||
      spaceships.selection === null ||
      dates.departure === null
    ) {
      alert("Complete form")
      return
    }

    setShowTripSummary(true)
  }

  useEffect(() => {
    async function fetchSpeciesData() {
      const data = await getDataFromApi("species")
      if (data) setSpecies({ list: data, selection: null })
    }
    if (species.list.length === 0) fetchSpeciesData()

    async function fetchPeopleData() {
      const data = await getDataFromApi("people")
      if (data) setPeople(data)
    }
    if (people.length === 0) fetchPeopleData()

    async function fetchPlanetsData() {
      setLoadingPlanets(true)
      const planets = await getDataFromApi("planets")
      if (planets.length > 0) {
        setPlanets({ list: buildPlanetSpecies(planets, people, species) })
        setLoadingPlanets(false)
      }
    }
    if (
      planets.list.length === 0 &&
      people.length > 0 &&
      species.list.length > 0
    )
      fetchPlanetsData()

    async function fetchSpaceshipsData() {
      const data = await getDataFromApi("starships")
      if (data) setSpaceships({ list: data, selection: null })
    }
    if (spaceships.list.length === 0) fetchSpaceshipsData()
  }, [planets, people, species, spaceships])

  return (
    <>
      <div className="booking">
        <div className="booking__container">
          <div className="booking__title">BOOK YOUR TRIP</div>
          <FlightType flightType={flightType} setFlightType={setFlightType} />
          <div className="booking__details">
            <div className="booking__input">
              <span className="booking__label">Full Name</span>
              <input
                type="text"
                placeholder="Enter your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="booking__input">
              <span className="booking__label">Species</span>
              <CustomSelectSpecies
                data={species.list}
                setSpecies={setSpecies}
                loadingPlanets={loadingPlanets}
                setPlanets={setPlanets}
              />
            </div>
            <div className="booking__input">
              <span className="booking__label">From</span>
              <CustomSelectPlanets
                data={planets}
                setPlanets={setPlanets}
                type="departure"
                selectedSpecie={species.selection}
              />
            </div>
            <div className="booking__input">
              <span className="booking__label">To</span>
              <CustomSelectPlanets
                data={planets}
                dataToExclude={planets.departure}
                setPlanets={setPlanets}
                type="arrival"
                selectedSpecie={species.selection}
              />
            </div>
            <div className="booking__input">
              <span className="booking__label">Depart</span>
              <CustomDatePicker setDates={setDates} dateType="departure" />
            </div>
            <div className="booking__input">
              <span className="booking__label">Return</span>
              <CustomDatePicker
                flightType={flightType}
                setDates={setDates}
                dateType="arrival"
              />
            </div>
            <div className="booking__input">
              <span className="booking__label">Spaceship</span>
              <CustomSelectSpaceShips
                data={spaceships}
                setSpaceships={setSpaceships}
              />
            </div>
          </div>
          {spaceships.selection && (
            <SeatsMap
              spaceshipName={spaceships.selection}
              setSeatNumber={setSeatNumber}
            />
          )}
          <div className="booking__button">
            <input
              type="submit"
              value="CONFIRM MY TRIP"
              onClick={handleSubmit}
            />
          </div>
        </div>
        <TripSummary
          showTripSummary={showTripSummary}
          flightType={flightType}
          fullName={fullName}
          departure={planets.departure}
          arrival={planets.arrival}
          specie={species.selection}
          dateDeparture={dates.departure}
          dateArrival={dates.arrival}
          setShowTripSummary={setShowTripSummary}
          seatNumber={seatNumber}
        />
      </div>
    </>
  )
}

export default App
