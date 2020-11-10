import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TopImg from 'image/Top.png';


const Top = styled.img`
    position: fixed;

    bottom : 30px;
    right : 30px;

    cursor: pointer;

    z-index: 99;

    width: 70px;
    display: ${props => props.isBtm ? "block" : "none"};
    
`;


const MoveTop = () => {
    const [isBottom, setIsBottom] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= (scrollHeight-60)) {
            setIsBottom(true);
        }else {
            setIsBottom(false);
        }
    };

    const onTopMove = () => {
        window.scrollTo({top:0, left:0, behavior:'smooth'})
    }

    return (
        <Top src={TopImg} alt="topImgBtn" onClick={onTopMove} isBtm={isBottom}/>
    )
}

export default MoveTop;