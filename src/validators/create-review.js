export const reviewShema = {
    title: title => (typeof title === 'string' && title.length > 0 && title.length < 25),
    content: content => (typeof content === 'string' && content.length > 0 && content.length < 255),
};