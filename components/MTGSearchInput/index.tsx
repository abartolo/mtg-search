import React, { useState } from 'react';
import fetch from 'isomorphic-fetch';
import Autocomplete from 'react-autocomplete';

interface MTGImageURIs {
    small: string;
    normal: string;
    png: string;
}

interface MTGLegalities {
    brawl: string;
    commander: string;
    duel: string;
    future: string;
    gladiator: string;
    historic: string;
    legacy: string;
    modern: string;
    oldschool: string;
    pauper: string;
    penny: string;
    pioneer: string;
    premodern: string;
    standard: string;
    vintage: string;
}

interface MTGPrices {
    eur: string;
    eur_foil: string;
    tix: string;
    usd: string;
    usd_foil: string;
}

export interface MTGCard {
    id: string;
    name: string;
    image_uris: MTGImageURIs;
    legalities: MTGLegalities;
    prices: MTGPrices;
}

interface MTGSearchInputProps {
    onCardResult: (results: MTGCard) => void;
}

const MTGSearchInput: React.FC<MTGSearchInputProps> = ({
    onCardResult
}) => {
    const [value, setValue] = useState('');
    const [autoResults, setAutoResults] = useState([]);

    const onChange = async (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;

        setValue(value);

        try {
            const response = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${value}`);
            const { data: results } = await response.json();

            console.log('Alex - Fetch Results', {
                value,
                results,
            });
            setAutoResults(results);
        } catch (e) {
            console.log('Alex - ERROR - Fetching AutoComplete', e);
            setAutoResults([]);
        }
    }

    const getCardData = async (cardName: string) => {
        try {
            const response = await fetch(`https://api.scryfall.com/cards/search?q=${cardName}`);
            const { data: results } = await response.json();
            const cardData = results[0];
            console.log('Alex - Card Result', cardData);
            onCardResult(cardData);
        } catch (e) {
            console.log('Alex - ERROR - Fetching AutoComplete', e);
        }
    }

    return (
        <Autocomplete
            getItemValue={(item: string) => item}
            items={autoResults}
            renderItem={(item: string, isHighlighted: boolean) =>
                <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item}
                </div>
            }
            value={value}
            onChange={onChange}
            onSelect={(val: string) => {
                setValue(val);
                getCardData(val);
            }}
        />
    )
}

export default MTGSearchInput;