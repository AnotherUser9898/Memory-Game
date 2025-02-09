import { useState } from 'react';
import { useEffect } from 'react';
import { Card } from './components/Card';
import { fetchData } from './functions/fetch-data';
import { shuffleArray } from './functions/shuffle-array';
import './App.css';

function App() {
    const [pokeData, setPokeData] = useState([]);
    const [bestScore, setBestScore] = useState(0);
    const [currScore, setCurrScore] = useState(0);

    let cards = null;
    useEffect(() => {
        fetchData().then((response) => setPokeData(response));
    }, []);

    if (pokeData) {
        cards = pokeData.map((data) => (
            <Card
                key={data.key}
                imageURL={data.imageURL}
                title={data.name}
                alreadyClicked={data.alreadyClicked}
                handleClick={handleCardClick}
                pokeData={pokeData}
            />
        ));
    }

    function handleCardClick(targetTitle, pokeData) {
        const dataObject = pokeData.find((data) => data.name == targetTitle);

        const shuffledArray = shuffleArray(pokeData);
        setPokeData(
            shuffledArray.map((data) => {
                if (dataObject.alreadyClicked) {
                    return { ...data, alreadyClicked: false };
                } else if (data.name == targetTitle) {
                    return { ...data, alreadyClicked: !data.alreadyClicked };
                } else {
                    return data;
                }
            })
        );

        let currentScore = currScore;
        if (!dataObject.alreadyClicked) {
            currentScore += 1;
        } else {
            currentScore = 0;
        }

        setBestScore(currentScore > bestScore ? currentScore : bestScore);
        setCurrScore(currentScore);
    }

    return (
        <>
            <h1 className="memory-game-title">Memory Title</h1>
            <div className="score-container">
                <div className="best-score">
                    Best Score:{' '}
                    <span className="best-score-value">{bestScore}</span>
                </div>
                <div className="best-score">
                    Current Score:{' '}
                    <span className="current-score-value">{currScore}</span>
                </div>
            </div>
            <main className="cards-container">{cards}</main>
        </>
    );
}

export default App;
