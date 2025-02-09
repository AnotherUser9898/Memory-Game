import PropTypes from 'prop-types';
import '../styles/card.css';

function Card({ imageURL, title, handleClick, pokeData, alreadyClicked }) {
    Card.propTypes = {
        imageURL: PropTypes.string,
        title: PropTypes.string,
        handleClick: PropTypes.func,
        pokeData: PropTypes.array,
        alreadyClicked: PropTypes.bool,
    };

    return (
        <article
            className="card-container"
            onClick={(e) => {
                handleClick(title, pokeData, alreadyClicked);
            }}
        >
            <div className="image-container">
                <img
                    src={imageURL}
                    alt={`${title} image`}
                    className="pokemon-image"
                />
            </div>

            <h3 className="pokemon-name">{title}</h3>
        </article>
    );
}

export { Card };
