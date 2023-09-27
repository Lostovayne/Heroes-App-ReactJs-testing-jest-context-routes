import {render, screen, fireEvent} from '@testing-library/react';
import {Navbar} from '../../src/ui';
import {AuthContext} from '../../src/auth';
import {MemoryRouter} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

const mockedNavigate = jest.fn();

//mock de react router dom
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate,
}));

describe('Pruebas en <Navbar />', () => {
    const UserValue = {
        logged: true,
        user: {
            id: 'ABC123',
            name: 'Camila Doe',
        },
        logout: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe de mostrarse el nombre del usuario', () => {
        render(
            <AuthContext.Provider value={UserValue}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText(UserValue.user.name)).toBeTruthy();
        expect(screen.getByText('Logout')).toBeTruthy();
    });

    test('Debe de mostrar el boton de logout', () => {
        render(
            <AuthContext.Provider value={UserValue}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        const ButtonLogout = screen.getByRole('button', {name: 'Logout'});
        expect(ButtonLogout).toBeTruthy();
        fireEvent.click(ButtonLogout);
        expect(UserValue.logout).toHaveBeenCalled();
        //llamada del navigate
        expect(mockedNavigate).toHaveBeenCalledWith('/login', {
            replace: true,
        });
    });
});
