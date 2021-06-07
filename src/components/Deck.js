import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import styled from 'styled-components';
import PokercardImage from '../card.png';

const Container = styled.div` 
    background-color: green;
    border: 2px solid black;
    height: 500px;
    margin: 20px;
`;

const SubContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 20px;
`;

const CurHandContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
`;

const ShuffleButton = styled.button`   
    display: block;
    height: 50px;
    width: 140px;
    margin: 40px;
    background: #353839;
    color: white;
    font-size: 20px;
`;

const DealButton = styled.button`   
    display: block;
    margin: 20px;
    background-image: url(${PokercardImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 150px 250px;
    width: 150px;
    height: 250px;
    border-radius: 8px;
`;

const GameEnd = styled.span`
    height: 250px;
    width: 160px;
    border: 1px solid black;
    margin: 20px;
    background-color: #DCDCDC;
`;

const Deck = () => {
    const [remainingCards, setRemainingCards] = useState([]);
    const [visibleCards, setVisibleCards] = useState([]);
    const [showDealButton, setShowDealButton] = useState(false);

    useEffect(() => {
        setRemainingCards(getDeck());
    }, []);

    const getDeck = () => {
        const suits = ["♥", "♦", "♠", "♣"];
        const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        let deck = [];
        let card = [];

        for (let x = 0; x < suits.length; x++) {
            for (let y = 0; y < values.length; y++) {
                card = { suit: suits[x], value: values[y] };
                deck.push(card);
            }
        };

        return deck;
    };

    const shuffleCards = () => {
        const newDeck = Object.assign(remainingCards);

        // same as shuffling 4 times in RL
        for (let i = 0; i < 100; i ++) {
            let location1 = Math.floor((Math.random() * newDeck.length));
            let location2 = Math.floor((Math.random() * newDeck.length));
            let tmp = newDeck[location1]

            newDeck[location1] = newDeck[location2];
            newDeck[location2] = tmp;
        }

        setRemainingCards(newDeck);
        setVisibleCards([]);
        setShowDealButton(true);
    };

    const dealCards = () => {
        const curHand = remainingCards.splice(0, 5);

        if (remainingCards.length !== 0) {
            setVisibleCards(curHand)
            setShowDealButton(true)
        } else {
            setRemainingCards(getDeck())
            setVisibleCards(curHand)
            setShowDealButton(false)
        }
    };

    return (
        <Container>
            <ShuffleButton onClick={shuffleCards}>Shuffle</ShuffleButton>
                <SubContainer>
                    {
                        showDealButton &&
                        <DealButton onClick={dealCards} />
                    }
                    {
                        visibleCards.length === 2 &&
                        <GameEnd />
                    }
                    <CurHandContainer>
                        {
                            visibleCards.length !== 0 &&
                            visibleCards.map(card => <Card key={`${card.suit}-${card.value}`} suit={card.suit} value={card.value} />)
                        }
                    </CurHandContainer>
                </SubContainer>
        </Container>
    );
};

export default Deck;

    