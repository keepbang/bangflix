import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { tvApi } from '../api';
import logo from 'image/logo.png';
import Loader from '../Components/Loader';

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
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
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 10px;
`;

const AirDate = styled.div`
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 10px;
`;

export const Season = withRouter(({match: {params: {id,number}}}) => {
    const [season,setSeason] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);


    const getSeason = async () => {
        try {
            
            const {data:result} = await tvApi.season(id,number);

            console.log(result);
            
            setSeason(result);
        } catch {
            setError("Can't find anything.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getSeason();
    }, [loading])
    
    return (
        loading ?
        <Loader/> :(
        <Container>
            <Content>
                {
                    season.poster_path ? 
                    ( <Cover bgImage={`https://image.tmdb.org/t/p/original${season.poster_path}`}/> ):
                    <NonCover/>
                }

                <Data>
                    <Title>{season.name}</Title>
                    <AirDate>{season.air_date}</AirDate>
                </Data>
            </Content>
        </Container>
        )
    )
});
