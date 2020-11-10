import React from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
    :not(:last-child){
        margin-bottom: 50px;
    }
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    display: flex;
    flex-basis: 100%;
    align-items: center;
    margin: 8px 0px;
    ::after,::before{
        content: "";
        flex-grow: 1;
        background: rgba(255, 255, 255, 0.35);
        height: 1px;
        font-size: 0px;
        line-height: 0px;
        margin: 0px 16px;
    }
`;

const Grid = styled.div`
    margin-top: 25px;
    display: grid;
    grid-template-columns: repeat(auto-fill,125px);
    grid-gap: 25px;
`;

const Section = ({title, children}) => (
    <Container>
        <Title>{title}</Title>
        <Grid>{children}</Grid>
    </Container>
);

Section.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default Section;