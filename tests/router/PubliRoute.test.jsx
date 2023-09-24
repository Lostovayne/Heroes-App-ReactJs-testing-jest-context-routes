import { render, screen } from '@testing-library/react';
import { PublicRoute } from './../../src/router/PublicRoute';
import { AuthContext } from '../../src/auth';
import { MemoryRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';

describe('Pruebas en PublicRoute', () => {
    const { Provider } = AuthContext;
    test('Debe de mostrar el children si no está autenticado', () => {
        const contextValue = {
            logged: false,
        };

        render(
            <Provider value={contextValue}>
                <PublicRoute>
                    <h1>Publico</h1>
                </PublicRoute>
            </Provider>
        );

        // screen.debug();

        expect(screen.getByText('Publico')).toBeTruthy();
    });

    test('Debe de navegar a /marvel si está autenticado', () => {
        const contextValue = {
            logged: true,
            user: {
                id: 'ABC123',
                name: 'Camila Doe',
            },
        };

        render(
            <Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route
                            path='login'
                            element={
                                <PublicRoute>
                                    <h1>Publico</h1>
                                </PublicRoute>
                            }
                        />
                        <Route path='marvel' element={<h1>Página Marvel</h1>} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        // screen.debug();
        expect(screen.getByText('Página Marvel')).toBeTruthy();
    });
});
