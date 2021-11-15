/** Load and construct the Species List from the API */
export const buildOptions = (data) => {
  const options = []
  data.forEach((value) => {
    options.push({ value: value.name, label: value.name })
  })
  //   EXAMPLE > const options = [{ value: "Tatatouin", label: "Tatatouin" },]
  return options
}

/** Function to add the species present in each planet
 *  For that, we check the species of the residents of the planet
 *  And then we contruct a new Planet Object with the list of the species
 */
export const buildPlanetSpecies = (planets, people, species) => {
  const newPlanets = [...planets]
  for (let index = 0; index < newPlanets.length; index++) {
    const planet = newPlanets[index]
    let planetSpeciesList = []
    if (planet.residents.length > 0) {
      for (const resident of planet.residents) {
        let peopleIndex
        let residentSpecies = []
        peopleIndex = resident.match(/\d+/)[0]
        if (people[peopleIndex - 1]?.species)
          residentSpecies = people[peopleIndex - 1]?.species
        if (residentSpecies.length > 0) {
          for (const specie of residentSpecies) {
            let specieIndex
            specieIndex = specie.match(/\d+/)[0]
            planetSpeciesList.push(species.list[specieIndex - 1].name)
          }
        }
      }
    }
    newPlanets[index]["species"] = planetSpeciesList
  }
  return newPlanets
}
