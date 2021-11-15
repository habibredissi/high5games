import axios from "axios"

/** Request and construct the data from the API */
export const getDataFromApi = async (type = "species") => {
  let results = [],
    response,
    counter = 1
  try {
    /** Retrieve all the data through the multiple pages */
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
