import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import queryString from 'query-string';
import { HeroCard } from '../components/HeroCard';
import { useLocation } from 'react-router-dom';
import { getHeroByName } from '../helpers';

export const SearchPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { q = '' } = queryString.parse(location.search);

    const heroes = getHeroByName(q);

    const { searchText, onInputChange, onResetForm } = useForm({
        searchText: q,
    });

    const onSearchSubmit = (event) => {
        event.preventDefault();
        navigate(`?q=${searchText}`);
        onResetForm();
    };

    return (
        <>
            <h1>Search</h1>
            <hr />
            <div className='row'>
                <div className='col-5'>
                    <h4>Searching</h4>
                    <hr />
                    <form onSubmit={onSearchSubmit}>
                        <input
                            type='text'
                            placeholder='Search a hero'
                            className='form-control'
                            name='searchText'
                            autoComplete='off'
                            value={searchText}
                            onChange={onInputChange}
                        />
                        <button className='btn btn-outline-primary' type='submit'>
                            Search
                        </button>
                    </form>
                </div>

                <div className='col-7'>
                    <h4>Results</h4>
                    <hr />

                    {q === '' && <div className='alert alert-primary'>Search a hero</div>}
                    {heroes.length === 0 && q !== '' && (
                        <div className='alert alert-danger'>No hero with {q}</div>
                    )}

                    {heroes.map((hero) => (
                        <HeroCard key={hero.id} {...hero} />
                    ))}
                </div>
            </div>
        </>
    );
};
