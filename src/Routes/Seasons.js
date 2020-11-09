import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../image/logo.png';

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
`;

const Title = styled.div`
    cursor: pointer;
    padding: 7px 10px;
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 10px;
    background-color: #82E0AA;
    color: #34495E;
    border-radius: 4px;
    display: inline-block;

    &:hover{
        color: #ECF0F1;
    };
`;

const SeasonContainer = styled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill,125px);
    grid-gap: 25px;
`;

const Info = styled.div`
    bottom: 5px;
    right: 5px;
    position: absolute;
    text-align: right;
    opacity: 0;
    transition: opacity 0.1s linear;
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

const NonImage = styled.div`
    background-image: url(${logo});
    height: 180px;
    background-size: cover;
    border-radius: 4px;
    background-position: center center;
    transition: opacity 0.1s linear;
    box-shadow: 0px 0px 5px 0px #000;
    background-color: #fff;
`;

const Season = styled.span`
    position: relative;
    &:hover {
        ${Image} {
            opacity: 0.3;
        }
        ${NonImage} {
            opacity: 0.3;
        }
        ${Info} {
            opacity: 1;
        }
    }
`;

const SeasonName = styled.div`
    font-size: 15px;
    font-weight: 500;
`;

const Item = styled.div`
    font-size: 13px;
    margin-top: 5px;
    margin-right: 5px;
`;

const SLink = styled(Link)`
    position: relative;
    display: grid;
`;

export const Seasons = withRouter(({history ,location: {state : {seasons,name}}, match: {params: {id}} }) => {

    const onClickTitle = () => {
        history.goBack(1);
    }

    return (
        <Container>
            <Title onClick={onClickTitle}>
                {name}
            </Title>
            <SeasonContainer>
                {
                    seasons.map(season => (
                        <SLink key={season.id} to={`/seasons/${id}/${season.season_number}`}>
                            <Season>
                                {
                                    season.poster_path?
                                    <Image bgUrl={`https://image.tmdb.org/t/p/w300/${season.poster_path}`}/> :
                                    <NonImage/>
                                }
                                <Info>
                                    <Item>
                                        <SeasonName>{season.name}</SeasonName>
                                    </Item>
                                    <Item>{season.air_date}</Item>
                                    <Item>Episode : {season.episode_count}</Item>
                                </Info>
                                
                            </Season>
                        </SLink>
                    ))
                }
            </SeasonContainer>
        </Container>
    );
});