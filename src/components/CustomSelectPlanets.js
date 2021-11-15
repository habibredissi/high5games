import React, { useEffect, useState } from "react"
import Select from "react-select"

const CustomSelectPlanets = ({ data, setPlanets, type, selectedSpecie }) => {
  const [options, setOptions] = useState([])
  const { list: listOfPlanets } = data
  const [value, setValue] = useState(null)

  useEffect(() => {
    if (listOfPlanets.length > 0) {
      setValue(null) // Erase the selected value when the Specie changes
      const newOptions = listOfPlanets.reduce((accu, current) => {
        /** Check if there is at least one member of
         *  their species for the arrival Planet */
        if (type === "arrival") {
          if (
            current.species.length > 0 &&
            current.species.includes(selectedSpecie)
          )
            accu.push({ value: current.name, label: current.name })
        } else if (type === "departure") {
          // All the planets are available for Departure
          accu.push({ value: current.name, label: current.name })
        }
        return accu
      }, [])
      setOptions(newOptions)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSpecie])

  /** Change the departure or arrival Planet */
  const handleSelection = (e) => {
    const newPlanetsState = { ...data }
    newPlanetsState[type] = e.value
    setPlanets(newPlanetsState)
    setValue({ label: e.value })
  }
  return (
    <>
      <Select
        options={options}
        onChange={(e) => handleSelection(e)}
        isDisabled={selectedSpecie ? false : true} // Disable until all the Species are loaded
        value={value}
        placeholder={
          type === "departure" ? "Departure planet" : "Arrival planet"
        }
      />
    </>
  )
}

export default CustomSelectPlanets
