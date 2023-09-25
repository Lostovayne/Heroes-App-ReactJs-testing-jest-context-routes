import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router/AppRouter';

describe('Pruebas en <AppRouter />', () => {
    test('debe de mostrar el login si no está autenticado', () => {
        const contextValue = {
            logged: false,
        };

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getAllByText('Login')).toHaveLength(2);
    });

    test('debe de mostrar el children si está autenticado', () => {
        const contextValue = {
            logged: true,
            user: {
                id: 'ABC123',
                name: 'Camila Doe',
            },
        };

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        // screen.debug();

        expect(screen.getByText('Camila Doe')).toBeTruthy();
        expect(screen.getByText('Logout')).toBeTruthy();
        expect(screen.getByText('Marvel')).toBeTruthy();
    });
});
