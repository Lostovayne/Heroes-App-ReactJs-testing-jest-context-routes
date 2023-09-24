import { types } from '../../../src/auth/types/types';

describe('Pruebas en "Types.js', () => {
    test('Debe de retornar estos types', () => {
        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        });
    });
});
