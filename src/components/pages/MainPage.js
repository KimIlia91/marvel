import { useState, Fragment } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
    const [ selectedChar, setSelectedChar ] = useState();

    const onCharSelected = (id) => {
        setSelectedChar(id);
    }

    return (
        <Fragment>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={ onCharSelected }/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo charId={ selectedChar }/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={ decoration } alt="vision"/>
        </Fragment>
    )
}

export default MainPage;