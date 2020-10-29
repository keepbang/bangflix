import React from "react";
import loadingImg from 'image/Loading.gif'

const HomePresenter = ({nowPlaying, upcoming, popular, error,loading}) => {
    
    return (
        <>
            {loading 
            ? <div>
                    <img src={loadingImg} alt="loading"/>
                </div>
            : (
                <div>
                    Home
                </div>
                )
            }
        </>
    )
}
export default HomePresenter;