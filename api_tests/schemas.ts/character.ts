// Key	Type	Description
// id	int	The id of the character.
// name	string	The name of the character.
// status	string	The status of the character ('Alive', 'Dead' or 'unknown').
// species	string	The species of the character.
// type	string	The type or subspecies of the character.
// gender	string	The gender of the character ('Female', 'Male', 'Genderless' or 'unknown').
// origin	object	Name and link to the character's origin location.
// location	object	Name and link to the character's last known location endpoint.
// image	string (url)	Link to the character's image. All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
// episode	array (urls)	List of episodes in which this character appeared.
// url	string (url)	Link to the character's own URL endpoint.
// created	string	Time at which the character was created in the database.

export const CharacterSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        status: { type: 'string' },
        species: { type: 'string' },
        type: { type: 'string' },
        gender: { type: 'string' },
        origin: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                naurlme: { type: 'string' }
            }
        },
        location: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                naurlme: { type: 'string' }
            }
        },
        image: { type: 'string' },
        episode: { type: 'array', items: { type: 'string' } },
        url: { type: 'string' },
        created: { type: 'string' }
    },
    required: [
        'name',
        'status',
        'species',
        'type',
        'gender',
        'origin',
        'location',
        'image',
        'episode',
        'url',
        'created'
    ],
    additionalProperties: false
}
