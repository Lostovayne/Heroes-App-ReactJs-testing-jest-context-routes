import {Route, Routes} from 'react-router-dom';
import {DcPage, HeroPage, MarvelPage, SearchPage} from '../pages';
import {Navbar} from '../../ui';
import {Navigate} from 'react-router-dom';
export const HeroesRoutes = () => {
    return (
        <>
            <Navbar />

            <div className='container'>
                {/* La rutas se cargan en el fragmento de la pagina */}
                <Routes>
                    <Route path='marvel' element={<MarvelPage />} />
                    <Route path='dc' element={<DcPage />} />
                    <Route path='search' element={<SearchPage />} />
                    <Route path='hero/:id' element={<HeroPage />} />
                    <Route path='/*' element={<Navigate to='/marvel' />} />
                </Routes>
            </div>
        </>
    );
};
