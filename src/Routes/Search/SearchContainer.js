import React from "react";
import { moviesApi, tvApi } from "../../api";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component{
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm: "",
        error: null,
        loading: false
    };

    onChangeTerm = (event) => {
        const {target: {value}} = event;
        this.setState({
            searchTerm: value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        const {searchTerm} = this.state;
        if(searchTerm !== ""){
            this.searchByTerm();
        }
    }

    searchByTerm = async () => {
        this.setState({loading: true});
        const {searchTerm} = this.state;
        try {
            const {data: {results: movieResults}} = await moviesApi.search(searchTerm);
            const {data: {results: tvResults}} = await tvApi.search(searchTerm);
            this.setState({
                movieResults,
                tvResults
            })
        } catch {
            this.setState({error: "Can't find results."});
        } finally {
            this.setState({loading: false});
        }
    };

    render() {
        const {movieResults, tvResults, searchTerm, error,loading} = this.state;
        return (
            <SearchPresenter
                movieResults={movieResults}
                tvResults={tvResults}
                searchTerm={searchTerm}
                error={error}
                loading={loading}
                handleSubmit={this.handleSubmit}
                onChangeTerm={this.onChangeTerm}
            />
        )
    }

};