import { ApiUrl, DocumentsPerPages, fetchData } from '../common/globals'
import { CharacterSchema } from '../schemas.ts/character'
import { PaginationSchema } from '../schemas.ts/pagination'
const Ajv = require('ajv')
const ajv = new Ajv()

describe('REST - Character - Happy', () => {
    it('Status code', async () => {
        const response = await fetchData()
        expect(response.status).toEqual(200)
    })

    it('Pagination response schema validation', async () => {
        const response = await fetchData<CharacterResponse>()
        const valid = ajv.validate(PaginationSchema, response.data.info)
        if (!valid) console.log(ajv.errors)
        expect(valid).toBe(true)
    })

    it('Pagination response validation - correct count', async () => {
        const response = await fetchData<CharacterResponse>()
        const count = response.data.info.count
        const pages = response.data.info.pages
        expect(Math.ceil(count / DocumentsPerPages)).toEqual(pages)
    })

    it('Pagination response validation - correct next/prev url', async () => {
        const response = await fetchData<CharacterResponse>()
        const pages = response.data.info.pages
        //From the docs: There is a total of 826 characters sorted by id.
        expect(response.data.info.next).toEqual(ApiUrl + '?page=2')
        expect(response.data.info.prev).toEqual(null)
    })

    // TODO: Add more recursive pagination checks
    it('Character response schema validation', async () => {
        const response = await fetchData<CharacterResponse>()
        for (const character of response.data.results) {
            const valid = ajv.validate(CharacterSchema, character)
            if (!valid) console.log(ajv.errors)
            expect(valid).toBe(true)
        }
    })

    it('Character specific page response schema validation', async () => {
        const response = await fetchData<SingleCharacterResponse>('/1')
        expect(response.status).toEqual(200)
        const valid = ajv.validate(CharacterSchema, response.data)
        if (!valid) console.log(ajv.errors)
        expect(valid).toBe(true)
    })
    
    it('Character specific page response schema validation', async () => {
        const response = await fetchData<SingleCharacterResponse[]>('/1,2')
        expect(response.status).toEqual(200)
        for (const character of response.data) {
            const valid = ajv.validate(CharacterSchema, character)
            if (!valid) console.log(ajv.errors)
            expect(valid).toBe(true)
        }
    })

    it('Character Filter', async () => {
        const response = await fetchData<CharacterResponse>()
        const firstCharacterName = response.data.results[0].name
        const response2 = await fetchData<CharacterResponse>('', {
            name: firstCharacterName
        })
        expect(response2.status).toEqual(200)

        for (const result of response2.data.results) {
            const valid = ajv.validate(CharacterSchema, result)
            if (!valid) console.log(ajv.errors)
            expect(valid).toBe(true)
            expect(result.name).toEqual(firstCharacterName)
        }
    })

    //TODO: Add more filter cases, see docs:
    // Available parameters:
    // name: filter by the given name.
    // status: filter by the given status (alive, dead or unknown).
    // species: filter by the given species.
    // type: filter by the given type.
    // gender: filter by the given gender (female, male, genderless or unknown).
})
