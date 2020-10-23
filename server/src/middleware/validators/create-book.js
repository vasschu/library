export const createBook = {
    title: title => (typeof title === 'string' && title.length > 0 && title.length < 255),
    author: content => (typeof content === 'string' && content.length > 0 && content.length < 255),
    description: desc => (typeof desc === 'string' && desc.length > 15 && desc.length < 5000),
    image: img => (typeof img === 'string'),
};