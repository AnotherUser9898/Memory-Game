async function fetchData() {
    const pokemonIDs = [
        1, 8, 28, 52, 43, 77, 119, 223, 74, 65, 51, 35, 19, 12, 205,
    ];
    const apiPrefix = 'https://pokeapi.co/api/v2/pokemon/';

    const pokemonData = [];

    for (let i = 0; i < pokemonIDs.length; i++) {
        const fetchURL = apiPrefix + String(pokemonIDs[i]) + '/';
        pokemonData.push(fetch(fetchURL));
    }

    const dataArray = await Promise.all(pokemonData);
    let JSONarray = await Promise.all(dataArray.map((data) => data.json()));

    const objectArray = JSONarray.map((data) => {
        return {
            name:
                String(data['forms'][0]['name']).charAt(0).toUpperCase() +
                String(data['forms'][0]['name']).slice(1),
            imageURL:
                data['sprites']['other']['official-artwork']['front_default'],
            key: crypto.randomUUID(),
            alreadyClicked: false,
        };
    });

    return objectArray;
}

export { fetchData };
