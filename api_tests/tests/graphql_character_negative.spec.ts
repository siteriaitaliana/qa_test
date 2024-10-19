import { fetchDataGQL } from '../common/globals'

describe('GraphQL - Character - Negative', () => {
    it('Query depth limit error', async () => {
        const query = ` 
            query Characters {
                character(id: "1") {
                    origin {
                        residents {
                            origin {
                                residents {
                                    origin {
                                        residents {
                                            id
                                            origin {
                                                residents {
                                                    origin {
                                                        residents {
                                                            origin {
                                                                residents {
                                                                    gender
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `
        try {
            await fetchDataGQL<any>(query)
            expect(false).toBe(true)
        } catch (err) {
            expect(err.status).toBe(413)
            expect(err.response.data.errors[0].extensions.code).toEqual(
                'GCDN_QUERY_DEPTH_LIMIT'
            )
            expect(err.response.data.errors[0].message).toEqual(
                'Query depth limit exceeded.'
            )
        }
    })

    it('Query without mandatory filter', async () => {
        const query = ` 
            query Character {
                character(id: null) {
                    id
                    name
                    status
                    species
                    type
                    gender
                    image
                    created
                }
            }

        `
        try {
            await fetchDataGQL<any>(query)
            expect(false).toBe(true)
        } catch (err) {
            expect(err.status).toBe(400)
            expect(err.response.data.errors[0].extensions.code).toEqual(
                'GRAPHQL_VALIDATION_FAILED'
            )
            expect(err.response.data.errors[0].message).toEqual(
                'Expected type ID!, found null.'
            )
        }
    })

    // TODO: Add more test cases
})
