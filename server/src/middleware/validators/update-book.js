export const updateBook = {
    title: title => ((typeof title === 'string' && (title.length > 0 && title.length < 255)) ||
                      typeof title === 'undefined'),
    author: content => ((typeof content === 'string' && (content.length > 0 && content.length < 255)) ||
                        typeof content === 'undefined'),
    description: desc => ((typeof desc === 'string' && (desc.length > 15 && desc.length < 5000)) ||
                        typeof desc === 'undefined'),
    image: img => (typeof img === 'string' ||
                    typeof img === 'undefined'),
};