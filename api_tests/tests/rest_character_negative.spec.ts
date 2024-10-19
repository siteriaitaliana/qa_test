import { fetchData, randomNumber } from '../common/globals'

describe('REST - Character - Negative cases', () => {
    it('Character Filter not existing', async () => {
        const name: string = randomNumber
        try {
            await fetchData<SingleCharacterResponse>('', {
                name
            })
            // Should error before with not found and not reach here'
            expect(false).toBe(true)
        } catch (err) {
            expect(err.status).toBe(404)
        }
    })

    it('Request page after pagination limit', async () => {
        const response = await fetchData<CharacterResponse>()
        const pages = response.data.info.pages
        try {
            await fetchData<CharacterResponse>('', {
                page: pages + 1
            })
            expect(false).toBe(true)
        } catch (err) {
            expect(err.status).toBe(404)
        }
    })

    //From the docs: There is a total of 826 characters sorted by id.
    it('Check id sorting', async () => {
        const response = await fetchData<CharacterResponse>()
        let prevId = 0
        for (const result of response.data.results) {
            if (prevId === 0) {
                prevId = result.id
            } else {
                expect(result.id).toBeGreaterThan(prevId)
                prevId = result.id
            }
        }
    })

    //From the docs: There is a total of 826 characters sorted by id.
    it('Check results count', async () => {
        const firstPageResponse = await fetchData<CharacterResponse>()
        expect(firstPageResponse.data.info.count).toBe(826)
        expect(firstPageResponse.data.info.pages).toBe(42)
        const lastPageResponse = await fetchData<CharacterResponse>('', {
            page: 42
        })
        expect(lastPageResponse.data.results.length).toBeGreaterThan(0)
    })
})
