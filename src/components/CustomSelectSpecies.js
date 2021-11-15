import React, { useEffect, useState } from "react"
import Select from "react-select"
import { ClipLoader } from "react-spinners"
import { buildOptions } from "../utilities/tools"

const CustomSelectSpecies = ({ data, setSpecies, setPlanets, planets }) => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    /** Build the List of the Species */
    if (data.length > 0 && options.length === 0) {
      setOptions(buildOptions(data))
    }
  }, [options, data])

  /** Add the selected Specie */
  const handleSelection = (e) => {
    const newSpecies = {
      list: data,
      selection: e.value
    }
    setSpecies(newSpecies)
    /** Reset the departure & arrival Planet */
    setPlanets((oldPlanets) => ({
      ...oldPlanets,
      departure: null,
      arrival: null
    }))
  }
  return (
    <>
      <Select
        className="customSelect"
        options={options}
        onChange={(e) => handleSelection(e)}
        isDisabled={planets.length === 0 || options.length === 0}
        placeholder={
          planets.length === 0 || options.length === 0 ? (
            <>
              <ClipLoader loading={true} size={15} color="#808090" />
              <span> Unleashing the force...</span>
            </>
          ) : (
            "Select your specie"
          )
        }
      />
    </>
  )
}

export default CustomSelectSpecies
