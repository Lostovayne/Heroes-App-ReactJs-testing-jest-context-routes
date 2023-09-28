import {Link} from 'react-router-dom';

export const HeroCard = ({id, superhero, publisher, alter_ego, first_appearance, characters}) => {
    const heroImageUrl = `/assets/heroes/${id}.jpg`;

    return (
        <div className='col animate__animated animate__fadeIn'>
            <div className='card'>
                <div className='row no-gutters'>
                    <div className='col-4'>
                        <img src={heroImageUrl} className='card-img' alt={superhero} />
                    </div>

                    <div className='col-8'>
                        <div className='card-body' aria-label='HeroBody'>
                            <h5 className='card-title'>{superhero}</h5>
                            <p className='card-text'>{alter_ego}</p>
                            <p className='card-text'>{first_appearance}</p>

                            {alter_ego !== characters && <p className='card-text'>{characters}</p>}
                        </div>

                        <Link to={`/hero/${id}`} className=''>
                            Más...
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
