import React, { useEffect, useState } from "react"
import Select from "react-select"
import { buildOptions } from "../utilities/tools"

const CustomeSelectSpaceships = ({ data, setSpaceships }) => {
  const [options, setOptions] = useState([])
  const { list: listSpaceships } = data

  useEffect(() => {
    /** List of military spaceships */
    const militarySpaceships = [
      "deep space mobile battlestation",
      "assault starfighter",
      "starfighter",
      "star dreadnought",
      "patrol craft",
      "armed government transport",
      "assault ship",
      "star destroyer"
    ]

    /** Filter the military spaceships */
    if (listSpaceships?.length > 0 && options.length === 0) {
      const newOptions = listSpaceships.filter(
        (spaceship) =>
          !militarySpaceships.includes(spaceship.starship_class.toLowerCase())
      )
      setOptions(buildOptions(newOptions))
    }
  }, [options, listSpaceships])

  const handleSelection = (e) => {
    setSpaceships((oldValue) => ({ ...oldValue, selection: e.value }))
  }
  return (
    <>
      <Select
        options={options}
        onChange={(e) => handleSelection(e)}
        placeholder="Select a Spaceship"
      />
    </>
  )
}

export default CustomeSelectSpaceships
