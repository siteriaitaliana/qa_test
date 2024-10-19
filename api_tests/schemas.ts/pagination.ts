export const PaginationSchema
 = {
    type: 'object',
    properties: {
        count: { type: 'integer' },
        pages: { type: 'integer' },
        next: { type: 'string' },
        prev: { type: ['string', 'null'] }
    },
    required: ['count', 'pages', 'next', 'prev'],
    additionalProperties: false
}
