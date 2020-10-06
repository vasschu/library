const borrowBookShema = {
	users_id: (user) => typeof +user === 'number',
};

export default borrowBookShema;
