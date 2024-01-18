import { useState, Fragment } from "react";

import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import SearchBar from "../components/searchBar/SearchBar";

import decoration from '../resources/img/vision.png';

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
                    <div className="char__wrapper">
                        <CharInfo charId={ selectedChar }/>
                        <SearchBar/>
                    </div>
                </ErrorBoundary>
                
            </div>
            <img className="bg-decoration" src={ decoration } alt="vision"/>
        </Fragment>
    )
}

export default MainPage;