import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { moviesApi, tvApi } from '../api';

import Message from 'Components/Message'

import logo from 'image/logo.png';

const Container = styled.div`
    width: 100%;
    height : 250px;
    background-color: rgba(33, 47, 60, 0.8);
    margin-top: 20px;
    display : flex;
    overflow-y: hidden;
    overflow-x: auto;
`;

const Credit = styled.div`
    
`;

const Image = styled.div`
    background-image: url(${props => props.bgUrl});
    height: 200px;
    background-size: contain;
    border-radius: 4px;
    background-position: center center;
    width: 150px;
    background-repeat: no-repeat;
    margin: 10px;
`;

const NonImage = styled.div`
    background-image: url(${logo});
    height: 200px;
    width: 150px;
    background-size: contain;
    border-radius: 4px;
    background-position: center center;
    background-color: #fff;
    background-repeat: no-repeat;
    margin: 10px;
`;

const Name = styled.div`
    text-align: center;
    font-size: 15px;
`;



export const Credits = ({isMovie, id}) => {
    const [casts, setCasts] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const getCredits = useCallback(async () => {
        try {
            
            let result = null;
            if(isMovie){
                ({data:{cast:result}} = await moviesApi.credits(id));
            }else{
                ({data:{cast:result}} = await tvApi.credits(id));
            }

            setCasts(result);
        } catch {
            setError("Can't find anything.");
        } finally {
            setLoading(false);
        }
    },[isMovie,id]);

    useEffect(() => {
        getCredits();
    },[getCredits,loading])

    return (
        loading ? 
        "" : (
            <Container>
                {casts.map(cast => 
                    <Credit key={cast.cast_id}>
                        {
                            cast.profile_path?
                            <Image bgUrl={`https://image.tmdb.org/t/p/w300/${cast.profile_path}`}/> :
                            <NonImage/>
                        }
                        <Name>{cast.name}</Name>
                    </Credit>
                )}
                {error && <Message color="#e74c3c" text={error}/>}
            </Container>
        )
    )
}