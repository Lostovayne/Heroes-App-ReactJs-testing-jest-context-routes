import {SearchPage} from './../../../src/heroes/pages/SearchPage';
import {MemoryRouter} from 'react-router-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import {useNavigate} from 'react-router-dom';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe(' Pruebas en Search Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe de mostrarse correctamente', () => {
        const {container} = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
        // screen.debug();
    });

    test('Buscar un heroe', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=spider']}>
                <SearchPage />
            </MemoryRouter>
        );
        // el input de busqueda debe de existir con el valor spider
        expect(screen.getByDisplayValue('spider')).toBeTruthy();
        // console.log(screen.getByDisplayValue('spider').value);
        const Input = screen.getByRole('textbox');
        expect(Input.value).toBe('spider');
        const Img = screen.getByRole('img');
        expect(Img.src).toContain('spider');
        //evaluar el texto search a hero no deberia aparecer
        expect(screen.queryByText('search a hero')).toBeNull();
        const divHeroBody = screen.getByLabelText('HeroBody');
        expect(divHeroBody.className).toContain('card-body');
    });

    test('Debe de mostrar un error si no se encuentra el heroe batman123', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );
        // screen.debug();
        expect(screen.getByText('No hero with batman123')).toBeTruthy();
        expect(screen.queryByText('search a hero')).toBeNull();
        const HeroAlert = screen.getByLabelText('HeroAlert');
        expect(HeroAlert.className).toContain('alert-danger');
        expect(HeroAlert.textContent).toContain('No hero with batman123');
    });

    test('debe de llamar el navigate a la pantalla nueva', () => {
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );

        // screen.debug();

        const InputHero = screen.getByRole('textbox');
        fireEvent.change(InputHero, {
            target: {
                name: 'searchText',
                value: 'superman',
            },
        });

        const form = screen.getByRole('form');
        fireEvent.submit(form);

        expect(mockedUseNavigate).toHaveBeenCalledWith('?q=superman');
    });
});
