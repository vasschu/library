export const table = 'books';
export const title = 'title';
export const author = 'author';
export const id = 'id';
export const isUnlisted = 'is_unlisted';

export const formatBookData = async (res) => {
	const allBooks = await res.map((el) => {
		if (el.borrowed) {
			el.borrowed = true;
		} else {
			el.borrowed = false;
		}
		if (el.is_unlisted) {
			el.is_unlisted = true;
		} else {
			el.is_unlisted = false;
		}
		return el;
	});

	return allBooks;
};
