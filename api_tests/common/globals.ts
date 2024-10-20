import axios from 'axios'

export const ApiUrl = 'https://rickandmortyapi.com/api/character'
export const GraphQLUrl = 'https://rickandmortyapi.com/graphql'

export const DocumentsPerPages = 20

// To point it to the mocked server use:
// export const apiUrl = 'http://localhost:3000/api/character'
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const randomNumber = (Math.random() + 1).toString(36).substring(2)

// TODO: This will eventually go in a specific http client class
export const fetchData = async <T>(
    extraUrl = undefined,
    params = undefined
) => {
    return !!extraUrl
        ? await axios.get<T>(ApiUrl + extraUrl, { params })
        : await axios.get<T>(ApiUrl, { params })
}

export const fetchDataGQL = async <T>(query: string) => {
    return await axios.post<T>(GraphQLUrl, { query })
}
