export function defaultHandler(response) {
    return response.data
}

export function errorHandler(error) {
    console.log(error)
}

export function serializeTodos(todosArray) {
    return [
        {
            id: 1,
            title: 'Спринт 1',
            date: '2024-01-10',
            items: todosArray.slice(0, 4)
        },
        {
            id: 2,
            title: 'Спринт 2',
            date: '2024-01-11',
            items: todosArray.slice(4, 8)
        },
        {
            id: 3,
            title: 'Спринт 3',
            date: '2024-01-12',
            items: todosArray.slice(8, 12)
        },
    ]
}