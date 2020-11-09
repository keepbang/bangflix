import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from 'Components/Loader';
import { Helmet } from 'react-helmet';
import flag from 'country-code-emoji';

import imdbIcon from '../../image/imdbImg.png';
import { Link } from 'react-router-dom';
import logo from 'image/logo.png';


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
    min-height: 1080px;
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
    min-height: 960px;
`;

const NonCover = styled.div`
    width: 30%;
    background-image: url(${logo});
    background-position: center center;
    background-size: contain;
    height: 100%;
    border-radius: 4px;
    min-height: 960px;
    background-color: #fff;
    background-repeat: no-repeat;
`;

const Data = styled.div`
    width: 70%;
    margin-left: 10px;
`;

const Title = styled.div`
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 10px;
`;

const ItemContainer = styled.div`
    margin: 20px 0 0 0;
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
    position: absolute;
    top: -20px;
    right: -10px;
    background-color: rgba(28, 40, 51);
    padding: 3px 5px;
    border-radius: 5px;
    opacity: 0.7;
`;

const StarContainer = styled.span`
    cursor: default;
    position: relative;
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
    font-size: 13px;
    opacity: 0.7;
    line-height: 1.5;
    width: 100%;
`;

const ImdbImg = styled.img`
    width: 25px;
    height: 25px;
    margin-bottom: -8px;
`;

const YtbContainer = styled.div`
    background-color: rgba(33, 47, 60, 0.8);
    width: fit-content;
    max-width: 100%;
    height: 270px;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    min-width: 460px;
`;

const Nodata = styled.div`
    font-size: 20px;
    height: 270px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const YoutubeBox = styled.iframe`
    display: inline;
    margin: 10px;
`;

const ProductCompany = styled.span`
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
    height: 90%;
    width: 400px;
    display: inline-grid;
    margin-right: 10px;
    margin-top: 13px;
    vertical-align: top;
    :first-child{
        margin-left: 10px;
    }
`;

const NoLogoCompany = styled.span`
    font-size: 30px;
    display: grid;
    justify-self: center;
    align-self: center;
`;


const ProductCompanies = styled.div`
    background-color: rgba(33, 47, 60, 0.8);
    min-width: 460px;
    width: fit-content;
    max-width: 100%;
    height: 270px;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
`;

const ItemTitle = styled.div`
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 600;
`;


const SeasonBtn = styled.span`
    padding: 2px 10px;
    font-size: 13px;
    background-color: #82E0AA;
    color: #34495E;
    border-radius: 10px;

    &:hover{
        color: #ECF0F1;
    }
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

const HomePresenter = ({result, error,loading, isMovie}) => (    
    
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
                
                {
                    result.poster_path ? (
                        <Cover bgImage={`https://image.tmdb.org/t/p/original${result.poster_path}`}/> ):
                        <NonCover/>
                }
                <Data>
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
                            <a href={result.imdb_id ? `https://www.imdb.com/title/${result.imdb_id}` : "#"} target="_blank" rel="noopener noreferrer">
                                <ImdbImg src={imdbIcon} alt="imdbImage"/>
                            </a>
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
                        {
                            !isMovie ? (
                                    <>
                                        <Divider>|</Divider>
                                        <SeasonBtn>
                                            {console.log(result.seasons)}
                                            <Link to={{
                                                pathname:`/seasons/${result.id}`,
                                                state:{
                                                    seasons : result.seasons ,
                                                    name: result.original_name
                                                }
                                            }}>Seasons →</Link>
                                        </SeasonBtn>
                                    </>
                                ):
                                ""
                            
                        }
                    </ItemContainer>
                    <ItemTitle>Overview</ItemTitle>
                    <Overview>
                        {result.overview}
                    </Overview>
                    <ItemTitle>Videos</ItemTitle>
                    <YtbContainer>
                        {
                            result.videos.results.length === 0 ?
                            <Nodata>No Videos</Nodata> : (
                                result.videos.results.map((video) => 
                                    <YoutubeBox width="460" height="250" src={`https://www.youtube.com/embed/${video.key}`}/>
                                )   
                            )
                        }
                    </YtbContainer>
                    <ItemTitle>Production Companies</ItemTitle>
                    <ProductCompanies>
                        {
                            result.production_companies.length === 0 ?
                            <Nodata>No Production Companies</Nodata> : 
                            (
                                result.production_companies.map((company) => (
                                        company.logo_path ?
                                        <ProductCompany bgImage={company.logo_path?`https://image.tmdb.org/t/p/original${company.logo_path}`:""}/> :
                                        <ProductCompany><NoLogoCompany>{company.name}</NoLogoCompany></ProductCompany>
                                    )
                                )
                            )
                        }
                    </ProductCompanies>
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