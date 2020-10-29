import React from "react";
import TVPresenter from "./TVPresenter";

export default class extends React.Component{
    state = {
        topRaged: null,
        airingToday: null,
        popular: null,
        error: null,
        loading: true
    };

    render() {
        const {topRaged, airingToday, popular, error,loading} = this.state;
        return (
            <TVPresenter
                topRaged={topRaged}
                airingToday={airingToday}
                popular={popular}
                error={error}
                loading={loading}
            />
        )
    }

};