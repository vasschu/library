export const updateReviewShema = {
    title: title => (typeof title === 'string' && title.length > 0 && title.length < 25
                    || typeof title === 'undefined'),
    content: content => (typeof content === 'string' && content.length > 0 && content.length < 255
                    || typeof content === 'undefined'),
};