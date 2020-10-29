import React from "react";
import HomPresenter from "./HomePresenter";

export default class extends React.Component{
    state = {
        nowPlaying: null,
        upcoming: null,
        popular: null,
        error: null,
        loading: true
    };

    render() {
        const {nowPlaying, upcoming, popular, error,loading} = this.state;
        return (
            <HomPresenter
                nowPlaying={nowPlaying}
                upcoming={upcoming}
                popular={popular}
                error={error}
                loading={loading}
            />
        )
    }

};