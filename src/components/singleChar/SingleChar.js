import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import useMarvelService from '../../services/marvelService';
import ProcessStatus from '../../enums/ProcessStatus';
import setItemContant from '../../utils/setItemContant';

import './singleChar.scss';

const SingleChar = () => {
    const { charId } = useParams();
    const [ char, setChar ] = useState(null);
    const { getCharacterByIdAsync, clearError, process, setProcess } = useMarvelService();

    /* eslint-disable*/
    useEffect(() => {
        updateComic();
    }, [charId])
    /* eslint-disable*/

    const updateComic = () => {
        clearError();
        getCharacterByIdAsync(charId)
            .then(onCharLoaded)
            .then(() => setProcess(ProcessStatus.CONFIRMED));
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    return (
        <>
            { setItemContant(process, View, char) }
        </>
    )
}

function View({ data }) {
    return (
        <div className="single-char">
            <img src={ data.thumbnail } alt={ data.name } className="single-char__img"/>
            <div className="single-char__info">
                <h2 className="single-char__name">{ data.name }</h2>
                <p className="single-char__descr">{ data.description }</p>
            </div>
            <Link to="/" className="single-char__back">Back to all</Link>
        </div>
    )
}

export default SingleChar;