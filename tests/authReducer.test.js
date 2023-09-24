// import { screen } from '@testing-library/react';
import { authReducer } from '../src/auth/context/authReducer';
import { renderHook } from '@testing-library/react';
import { types } from '../src/auth/types/types';

describe('Pruebas sobre el componente AuthReducer', () => {
    const initialState = {
        logged: false,
        user: null,
    };

    test('Debe de retornar el estado por defecto', () => {
        const { result } = renderHook(() => authReducer(initialState, {}));
        expect(result.current).toEqual(initialState);
    });

    test('Debe de (login) llamar al autenticar y establecer al user', () => {
        const action = {
            type: types.login,
            payload: { id: 'ABC', name: 'John Doe' },
        };

        const { result } = renderHook(() => authReducer(initialState, action));

        expect(result.current).toEqual({
            logged: true,
            user: action.payload,
        });
    });

    test('Debe de (logout) llamar al desautenticar borrar el name del usuario y logged en false', () => {
        const action = {
            type: types.logout,
        };

        const { result } = renderHook(() => authReducer(initialState, action));

        expect(result.current).toEqual({
            logged: false,
        });
    });
});
