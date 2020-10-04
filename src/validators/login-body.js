export const logInBody = {
    username: un => typeof un === 'string',
    password: pw => typeof pw === 'string',
};