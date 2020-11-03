import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from 'Components/Loader';
import { Helmet } from 'react-helmet';
import flag from 'country-code-emoji';

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
`;

const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    filter: blur(3px);
    opacity: 0.5;
    z-index: 0;
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    z-index: 1;
    height: 100%;
`;

const Cover = styled.div`
    width: 30%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    height: 100%;
    border-radius: 4px;
`;

const Data = styled.div`
    width: 70%;
    margin-left: 10px
`;

const Title = styled.div`
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 10px;
`;

const ItemContainer = styled.div`
    margin: 20px 0;
`;

const Item = styled.span``;

const Country = styled.span`
    font-size: 15px;
    &:not(:last-child){
        padding-right: 5px;
    }
`;

const Divider = styled.span`
    margin: 0 10px;
`;

const VoteAverage = styled.span`
    display: none;
    position: relative;
    top: -7px;
    left: 10px;
    background-color: rgba(28, 40, 51);
    padding: 3px 5px;
    border-radius: 5px;
    opacity: 0.7;
`;

const StarContainer = styled.span`
    cursor: default;
    &:hover{
        ${VoteAverage}{
            display: inline;
        }
    }
`;

const Star = styled.span`
    font-size: 14px;
    color: #F4D03F;
`;

const NonStar = styled.span`
    font-size: 14px;
    color: #B2BABB;
`;

const Overview = styled.p`
    font-size: 12px;
    opacity: 0.7;
    line-height: 1.5;
    width: 50%;
`;

const makeStar = (num) => {
    let result = [];
    for(let i = 0;i<5;i++){
        if(num > 0){
            result.push(true);
            num--;
        }else{
            result.push(false);
        }
    }
    return result;
}

const HomePresenter = ({result, error,loading}) => (    
    loading ? (
        <>
            <Helmet>
                <title>Loading | Bangflix</title>
            </Helmet>
            <Loader/> 
        </>
    )
    :(
        <Container>
            <Helmet>
                <title>{result.original_title? result.original_title : result.original_name} | Bangflix</title>
            </Helmet>
            <Backdrop bgImage={result.backdrop_path?`https://image.tmdb.org/t/p/original${result.backdrop_path}`:""}/>
            <Content>
                <Cover bgImage={
                    result.poster_path
                    ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                    : require("../../image/NonImg.png")
                }/>
                <Data>
                    {console.log(result)}
                    <Title>{result.original_title? result.original_title : result.original_name}</Title>
                    <ItemContainer>
                        <Item>
                            {result.release_date 
                            ? result.release_date.substring(0,4)
                            : result.first_air_date.substring(0,4)}
                        </Item>
                        <Divider>|</Divider>
                        <Item>
                            {result.runtime
                            ? result.runtime
                            : result.episode_run_time[0]} min
                        </Item>
                        <Divider>|</Divider>
                        <Item>
                            {
                                result.genres 
                                && result.genres.map((genre, index) => index === result.genres.length-1 ? genre.name: `${genre.name} / `)
                            }
                        </Item>
                        <Divider>|</Divider>
                            <Item>
                                {
                                    result.origin_country?
                                    result.origin_country.map((country) => <Country>{flag(country)}</Country>):
                                    result.production_countries.map((obj) => <Country>{flag(obj.iso_3166_1)}</Country>)
                                }
                            </Item>
                        <Divider>|</Divider>
                        <Item>
                            <StarContainer>
                                {
                                    makeStar(Math.round(result.vote_average/2)).map((star) => 
                                            star ? <Star>★</Star> : <NonStar>★</NonStar>
                                    )
                                }
                                <VoteAverage>{result.vote_average}/10</VoteAverage>
                            </StarContainer>
                        </Item>
                        
                    </ItemContainer>
                    <Overview>
                        {result.overview}
                    </Overview>

                </Data>
            </Content>
        </Container>
    )
);

HomePresenter.propTypes = {
    result: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired
}

export default HomePresenter;