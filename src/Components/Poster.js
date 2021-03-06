import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import logo from '../image/logo.png';

const Container = styled.div`
    font-size: 12px;
`;

const Image = styled.div`
    background-image: url(${props => props.bgUrl});
    height: 180px;
    background-size: cover;
    border-radius: 4px;
    background-position: center center;
    transition: opacity 0.1s linear;
    box-shadow: 0px 0px 5px 0px #000;
`;

const Rating = styled.span`
    bottom:5px;
    right: 0px;
    position: absolute;
    opacity: 0;
    transition: opacity 0.1s linear;
`;

const ImageContainer = styled.div`
    margin-bottom: 5px;
    position: relative;
    &:hover {
        ${Image} {
            opacity: 0.3;
        }
        ${Rating} {
            opacity: 1;
        }
    }
`;

const Title = styled.span`
    display: block;
    margin-bottom: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Year = styled.span`
    font-size: 10px;
    color: rgba(255,255,255, 0.5);
`;

const NonPoster = styled.div`
    background-image: url(${logo});
    height: 180px;
    background-size: cover;
    border-radius: 4px;
    background-position: center center;
    transition: opacity 0.1s linear;
    box-shadow: 0px 0px 5px 0px #000;
    background-color: #fff;
`;

const Poster = ({id, imageUrl, title, rating, year, isMovie = false}) => (
    <Link to={isMovie? `/movie/${id}` : `/show/${id}`}>
        <Container>
            <ImageContainer>
                {
                    imageUrl ?
                    <Image bgUrl={`https://image.tmdb.org/t/p/w300${imageUrl}`}/> :
                    <NonPoster/>
                }
                
                <Rating>
                    <span role="img" aria-label="rating">
                        ⭐️
                    </span>{" "}
                    {rating}/10
                </Rating>
            </ImageContainer>
            <Title>{title}</Title>
            <Year>{year}</Year>
        </Container>
    </Link>
)

Poster.propTypes = {
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number,
    year: PropTypes.string,
    isMovie: PropTypes.bool
}

export default Poster;