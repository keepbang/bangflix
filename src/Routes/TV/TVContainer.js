import React from "react";
import { tvApi } from "api";
import TVPresenter from "./TVPresenter";

export default class extends React.Component{
    state = {
        topRaged: null,
        airingToday: null,
        popular: null,
        error: null,
        loading: true
    };

    async componentDidMount() {
        try {
            const {data: {results : topRated}} = await tvApi.topRated();
            const {data: {results : airingToday}} = await tvApi.airingToday();
            const {data: {results : popular}} = await tvApi.popular();
            this.setState({
                topRated,
                airingToday,
                popular
            })
        } catch  {
            this.setState({
                error: "Can't find tv information."
            })
        } finally {
            this.setState({
                loading: false
            })
        }
    }

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