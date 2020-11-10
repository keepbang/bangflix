import React, { useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { tvApi } from '../api';
import logo from 'image/logo.png';
import Loader from 'Components/Loader';
import Message from 'Components/Message'
import backImg from 'image/back.png';
import MoveTop from "Components/MoveTop";

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 20px 50px;
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

const Content = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    z-index: 1;
    height: 100%;
`;

const Data = styled.div`
    width: 70%;
    margin-left: 20px;
`;

const Title = styled.div`
    font-size: 36px;
    font-weight: 600;
    margin-bottom: 10px;
`;

const AirDate = styled.div`
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 10px;
`;

const BackBtn = styled.div`
    background-image: url(${backImg});
    background-position: center center;
    background-size: contain;
    width: 50px;
    height: 40px;
    margin-bottom: 20px;
    background-repeat: no-repeat;
    cursor: pointer;
    background-color: rgba(93, 109, 126,0.5);
    border-radius: 5px;
    &:hover{
        background-color: rgba(255, 255, 255,0.5);
    }
`;

const Episodes = styled.div`
    width: 100%;
    height: 800px;
    margin : 20px 0;
    padding: 10px;
    background-color: rgba(93, 109, 126,0.5);
    overflow-x : hidden;
    overflow-y : auto;
`;

const Episode = styled.div`
    display: flex;
    background-color: rgba(33, 47, 61,0.8);
    :not(:last-child){
        margin-bottom: 10px;
    }
    border-radius: 5px;
    box-shadow: 0px 0px 5px 0px #000;
`;

const Info = styled.div`
    padding: 10px;
    width: 100%;
`;

const EpName = styled.span`
    font-size: 25px;
`;

const EpAirDate = styled.div`
    opacity: 0.6;
    vertical-align: bottom;
    margin-bottom: 5px;
    margin-top: 5px;
`;

const EpVote = styled.span`
    float: right;
`;

const EpOverview = styled.p`
    line-height: 1.5;
`;

const EpStill = styled.div`
    background-image: url(${props => props.bgUrl});
    height: 158px;
    border-radius: 4px;
    background-position: center center;
    transition: opacity 0.1s linear;
    box-shadow: 0px 0px 5px 0px #000;
    width: 265px;
    background-repeat: no-repeat;
    margin : 10px;
`; 

const NonStill = styled.div`
    width: 265px;
    background-image: url(${logo});
    height: 158px;
    background-size: contain;
    border-radius: 4px;
    background-position: center center;
    transition: opacity 0.1s linear;
    box-shadow: 0px 0px 5px 0px #000;
    background-color: #fff;
    background-repeat: no-repeat;
`;

const Star = styled.span`
    font-size: 14px;
    color: #F4D03F;
`;

const NonStar = styled.span`
    font-size: 14px;
    color: #B2BABB;
`;

export const Season = withRouter(({history ,match: {params: {id,number}}}) => {
    const [season,setSeason] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const getSeason = useCallback( async () => {
        try {
            
            const {data:result} = await tvApi.season(id,number);
            
            setSeason(result);
        } catch {
            setError("Can't find anything.");
        } finally {
            setLoading(false);
        }
    },[id,number])

    useEffect(() => {
        getSeason();
    }, [getSeason,loading]);
    
    const onPushBack = () => {
        history.goBack(1);
    }

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

    return (
        loading ?
        <Loader/> :(
        <Container>
            <BackBtn onClick={onPushBack}/>
            <Content>
                {
                    season.poster_path ? 
                    ( <Cover bgImage={`https://image.tmdb.org/t/p/original${season.poster_path}`}/> ):
                    <NonCover/>
                }

                <Data>
                    <Title>{season.name}</Title>
                    <AirDate>{season.air_date}</AirDate>
                    <Episodes>
                        {
                            season.episodes.length !== 0
                            ? season.episodes.map((ep) => 
                                <Episode key={ep.id}>
                                    {
                                        ep.still_path ?
                                        <EpStill bgUrl={`https://image.tmdb.org/t/p/w300/${ep.still_path}`}/> :
                                        <NonStill/>
                                    }
                                    <Info>
                                        <EpName>{ep.name}</EpName>
                                        <EpVote>
                                        {
                                            makeStar(Math.round(ep.vote_average/2)).map((star) => 
                                                    star ? <Star>★</Star> : <NonStar>★</NonStar>
                                            )
                                        }
                                        </EpVote>
                                        <EpAirDate>{ep.air_date}</EpAirDate>
                                        <EpOverview>
                                            {ep.overview}
                                        </EpOverview>
                                    </Info>
                                </Episode>
                            )
                            : "No Episodes"
                        }
                    </Episodes>
                </Data>
            </Content>
            {error && <Message color="#e74c3c" text={error}/>}
            <MoveTop/>
        </Container>
        )
    )
});
