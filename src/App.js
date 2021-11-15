import { useState, useEffect } from "react"
import CustomSelectSpecies from "./components/CustomSelectSpecies"
import CustomSelectPlanets from "./components/CustomSelectPlanets"
import CustomSelectSpaceShips from "./components/CustomSelectSpaceShips"
import CustomDatePicker from "./components/CustomDatePicker"
import FlightType from "./components/FlightType"
import SeatsMap from "./components/SeatsMap"
import TripSummary from "./components/TripSummary"
import { getDataFromApi } from "./api/Request"
import { buildPlanetSpecies } from "./utilities/tools"
import "./styles/app.scss"

function App() {
  const startDate = new Date()
  const endDate = new Date().setDate(startDate.getDate() + 7)
  /** STATE MANAGEMENT */
  const [fullName, setFullName] = useState("")
  const [species, setSpecies] = useState({ list: [], selection: null })
  const [people, setPeople] = useState([])
  const [spaceships, setSpaceships] = useState({ list: [], selection: null })
  const [planets, setPlanets] = useState({
    list: [],
    departure: null,
    arrival: null
  })
  const [loadingPlanets, setLoadingPlanets] = useState(false)
  const [flightType, setFlightType] = useState("round-trip")
  const [dates, setDates] = useState({
    departure: startDate.toLocaleDateString("en-US"),
    arrival: new Date(endDate).toLocaleDateString("en-US")
  })
  const [showTripSummary, setShowTripSummary] = useState(false)
  const [seatNumber, setSeatNumber] = useState(null)

  /** Function to handle submit
   *  Check the form's input and
   *  Display the summary
   */
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
      alert("I am your father! All fields are required!")
      return
    }

    if (seatNumber === null) {
      alert("Please choose your seat in the Spaceship!")
      return
    }

    setShowTripSummary(true)
  }

  useEffect(() => {
    /** General function to fetch data from the API */
    async function fetchData(category) {
      try {
        const data = await getDataFromApi(category)
        if (data.length > 0) {
          switch (category) {
            case "species":
              setSpecies({ list: data, selection: null })
              break
            case "people":
              setPeople(data)
              break
            case "planets":
              setPlanets({
                list: buildPlanetSpecies(data, people, species)
              })
              setLoadingPlanets(false)
              break
            case "starships":
              setSpaceships({ list: data, selection: null })
              break
            default:
              break
          }
        }
      } catch (error) {
        console.error(error)
      }
    }

    /** Initial load of the Data for Species & People */
    if (species.list.length === 0) fetchData("species")
    if (people.length === 0) fetchData("people")
    /** We wait for People & Species to be loaded before
     *  Fetching for Planets
     */
    if (
      loadingPlanets === false &&
      planets.list.length === 0 &&
      people.length > 0 &&
      species.list.length > 0
    ) {
      setLoadingPlanets(true)
      fetchData("planets")
    }
    if (spaceships.list.length === 0) fetchData("starships")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planets, people, species, spaceships])

  return (
    <>
      <div className="booking">
        <div className="booking__container">
          <div className="booking__title">MAY THE FORCE BE WITH YOU!</div>
          <FlightType flightType={flightType} setFlightType={setFlightType} />
          <div className="booking__details">
            <div className="booking__input">
              <span className="booking__label">Full Name</span>
              <input
                type="text"
                placeholder="Enter your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoFocus
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
                planets={planets.list}
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
              <CustomDatePicker
                setDates={setDates}
                dateType="departure"
                startDate={startDate}
                endDate={endDate}
              />
            </div>
            <div className="booking__input">
              <span className="booking__label">Return</span>
              <CustomDatePicker
                flightType={flightType}
                setDates={setDates}
                dateType="arrival"
                startDate={startDate}
                endDate={endDate}
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
