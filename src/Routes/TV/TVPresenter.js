import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Section from 'Components/Section';
import Loader from 'Components/Loader';
import Message from 'Components/Message';
import Poster from 'Components/Poster';
import { Helmet } from 'react-helmet';
import MoveTop from "Components/MoveTop";

const Container = styled.div`
    padding: 20px;
`;

const TVPresenter = ({topRated, airingToday, popular, error,loading}) => (
<>
    <Helmet>
        <title>TV Shows | Bangflix</title>
    </Helmet>
        {
        loading ? 
        <Loader/> : (
        <Container>
            {topRated && topRated.length > 0 && (
                <Section title="Top Rated Shows">{
                    topRated.map((show) => (
                        <Poster key={show.id} id={show.id}
                                title={show.original_name}
                                imageUrl={show.poster_path}
                                rating={show.vote_average}
                                year={show.first_air_date}
                                isMovie={false}
                        />
                    ))
                }</Section>
            )}
            {airingToday && airingToday.length > 0 && (
                <Section title="Airing Today">{
                    airingToday.map((show) => (
                        <Poster key={show.id} id={show.id}
                                title={show.original_name}
                                imageUrl={show.poster_path}
                                rating={show.vote_average}
                                year={show.first_air_date}
                                isMovie={false}
                        />
                    ))
                }</Section>
            )}
            {popular && popular.length > 0 && (
                <Section title="Popular Shows">{
                    popular.map((show) => (
                        <Poster key={show.id} id={show.id}
                                title={show.original_name}
                                imageUrl={show.poster_path}
                                rating={show.vote_average}
                                year={show.first_air_date}
                                isMovie={false}
                        />
                    ))
                }</Section>
            )}
            {error && <Message color="#e74c3c" text={error}/>}
            <MoveTop/>
        </Container>
        )}
</>
);

TVPresenter.propTypes = {
    topRated: PropTypes.array,
    airingToday: PropTypes.array,
    popular: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired
}

export default TVPresenter;