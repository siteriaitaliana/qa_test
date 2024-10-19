import { fetchDataGQL } from '../common/globals'
import { CharacterQLSchema } from '../schemas.ts/characterQL'
const Ajv = require('ajv')
const ajv = new Ajv()

describe('GraphQL - Character - Happy', () => {
    it('Query character by id', async () => {
        const query = `
            query Characters {
                character(id: "1") {
                    id
                    name
                    status
                    species
                    type
                    gender
                    image
                    created
                    origin {
                        id
                        name
                        type
                        dimension
                        created
                    }
                    location {
                        id
                        name
                        type
                        dimension
                        created
                    }
                    episode {
                        id
                        name
                        air_date
                        episode
                        created
                    }
                }
            }

        `
        const response = await fetchDataGQL<any>(query)
        expect(response.status).toEqual(200)
        const valid = ajv.validate(
            CharacterQLSchema,
            response.data.data.character
        )
        if (!valid) console.log(ajv.errors)
        expect(valid).toBe(true)
        // Strict check assuming sorting and data order doesn't mutate
        expect(response.data.data.character.name).toEqual('Rick Sanchez')
        // TODO: add the other fields
    })

    it('Combined query (char name, location, episodes)', async () => {
        const query = `
            query {
                characters(page: 2, filter: { name: "rick" }) {
                    info {
                    count
                    }
                    results {
                    name
                    }
                }
                location(id: 1) {
                    id
                }
                episodesByIds(ids: [1, 2]) {
                    id
                }
            }
        `
        const response = await fetchDataGQL<any>(query)
        expect(response.status).toEqual(200)
        for (const result of response.data.data.characters.results) {
            expect(result.name.toLowerCase()).toContain('rick')
        }
        expect(response.data.data.location.id).toEqual('1')
        expect(response.data.data.episodesByIds[0].id).toEqual('1')
        expect(response.data.data.episodesByIds[1].id).toEqual('2')
    })
})
