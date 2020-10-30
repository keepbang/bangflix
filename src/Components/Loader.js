import React from 'react';
import styled from "styled-components";
import loadingImg from "image/Loading.gif"

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default () => (
    <Container>
        <span role="img" aria-label="Loading">
            <img src={loadingImg} alt="loadingImg"/>
        </span>
    </Container>
);


