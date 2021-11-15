import React, { useEffect, useState } from "react"
import Select from "react-select"
import { ClipLoader } from "react-spinners"
import { buildOptions } from "../utilities/tools"

const CustomSelectSpecies = ({
  data,
  setSpecies,
  loadingPlanets,
  setPlanets
}) => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    if (data.length > 0 && options.length === 0) {
      setOptions(buildOptions(data))
    }
  }, [options, data])

  const handleSelection = (e) => {
    const newSpecies = {
      list: data,
      selection: e.value
    }
    setSpecies(newSpecies)
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
        isDisabled={loadingPlanets}
        placeholder={
          loadingPlanets ? (
            <>
              <ClipLoader loading={true} size={15} color="#808090" />
              <span> Loading...</span>
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
