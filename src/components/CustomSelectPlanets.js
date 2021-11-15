import React, { useEffect, useState } from "react"
import Select from "react-select"

const CustomSelectPlanets = ({ data, setPlanets, type, selectedSpecie }) => {
  const [options, setOptions] = useState([])
  const { list: listOfPlanets } = data
  const [value, setValue] = useState(null)

  useEffect(() => {
    if (listOfPlanets.length > 0) {
      setValue(null)
      const newOptions = listOfPlanets.reduce((accu, current) => {
        if (type === "arrival") {
          if (
            current.species.length > 0 &&
            current.species.includes(selectedSpecie)
          )
            accu.push({ value: current.name, label: current.name })
        } else if (type === "departure") {
          accu.push({ value: current.name, label: current.name })
        }
        return accu
      }, [])
      setOptions(newOptions)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSpecie])

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
        isDisabled={selectedSpecie ? false : true}
        value={value}
        placeholder={
          type === "departure" ? "Departure planet" : "Arrival planet"
        }
      />
    </>
  )
}

export default CustomSelectPlanets
