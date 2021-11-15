import axios from "axios"

/** Load and construct the Species List from the API */
export const getDataFromApi = async (type = "species") => {
  let results = [],
    response,
    counter = 1
  try {
    do {
      response = await axios.get(
        `https://swapi.dev/api/${type}/?page=${counter}`
      )
      results = results.concat(response.data.results)
      counter++
    } while (response.data.next !== null)
    return results
  } catch (error) {
    console.error(error)
  }
}
