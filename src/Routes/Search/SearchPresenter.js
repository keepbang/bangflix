import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from 'Components/Loader';
import Section from 'Components/Section';
import Message from 'Components/Message';
import Poster from 'Components/Poster';
import { Helmet } from 'react-helmet';
import MoveTop from "Components/MoveTop";

const Container = styled.div`
    padding: 20px;
`;

const Form = styled.form`
    margin-bottom: 50px;
    width: 100%;
    text-align: center;
`;

const Input = styled.input`
    all: unset; // box 없애기
    font-size: 28px;
    width: 90%;
    border: 1px solid #48C9B0;
    color: #48C9B0;
    border-radius: 20px;
    padding: 5px 15px;
`;

const SearchPresenter = ({
    movieResults,
    tvResults,
    searchTerm,
    handleSubmit,
    onChangeTerm,
    error,
    loading}) => (
        <Container>
            <Helmet>
                <title>Search | Bangflix</title>
            </Helmet>
            <Form onSubmit={handleSubmit}>
                <Input placeholder="Search Movies or TV Shows..." value={searchTerm} onChange={onChangeTerm}/>
            </Form>
            {(
                loading ? 
                <Loader />:
                <>
                    {
                        movieResults && movieResults.length > 0 && (
                        <Section title="Movie Results">
                            {movieResults.map(movie => (
                                <Poster key={movie.id} id={movie.id}
                                    title={movie.original_title}
                                    imageUrl={movie.poster_path}
                                    rating={movie.vote_average}
                                    year={movie.release_date}
                                    isMovie={true}
                                />
                            ))}
                        </Section>
                    )}
                    {
                        tvResults && tvResults.length > 0 && (
                        <Section title="TV Show Results">
                            {tvResults.map(show => (
                                <Poster key={show.id} id={show.id}
                                        title={show.original_name}
                                        imageUrl={show.poster_path}
                                        rating={show.vote_average}
                                        year={show.first_air_date}
                                        isMovie={false}
                                />
                            ))}
                        </Section>
                    )}
                    {error && <Message color="#e74c3c" text={error}/>}
                    {tvResults && movieResults && tvResults.length === 0 && movieResults.length === 0 &&
                        (<Message color="#95a5a6" text="Nothing found"/>)
                    }
                </>
            )}
            <MoveTop/>
        </Container>
    );

SearchPresenter.propTypes = {
    movieResults: PropTypes.array,
    tvResults: PropTypes.array,
    searchTerm: PropTypes.string,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onChangeTerm: PropTypes.func.isRequired
}

export default SearchPresenter;