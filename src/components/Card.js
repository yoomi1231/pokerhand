import React from 'react';
import styled from 'styled-components';

const Fragment = styled.div`
    margin: 2px;
`;

const CardContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   padding: 20px;
   width: 100px;
   height: 200px;
   border: 2px solid black;
   border-radius: 8px;
   background-color: white;
   color: ${props => props.suit === "♥" || props.suit === "♦" ? "red" : "black"};
`;

const TopContent = styled.div`
    text-align: left;
    vertical-align: top;
`;

const MidContent = styled.div`
    font-size: 40px;
`;

const BotContent = styled.div`
    text-align: right;
    vertical-align: bottom;
`;

export const Card = ({ suit, value }) => {
    return (
        <Fragment>
            <CardContainer suit={suit}>
                <TopContent>{value}</TopContent>
                <MidContent>{suit}</MidContent>
                <BotContent>{value}</BotContent>
            </CardContainer>
        </Fragment>
    );
};