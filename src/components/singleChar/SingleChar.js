import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import './singleChar.scss';

const SingleChar = () => {
    const { charId } = useParams();
    const [ char, setChar ] = useState(null);
    const { loading, error, getCharacterByIdAsync, clearError } = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [charId])

    const updateComic = () => {
        clearError();
        console.log(charId);
        getCharacterByIdAsync(charId)
            .then(onCharLoaded);
    }

    const onCharLoaded = (char) => {
        console.log(char);
        setChar(char);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={ char }/> : null;

    return (
        <>
            { errorMessage } { spinner } { content }
        </>
    )

    function View({ char }) {
        return (
            <div className="single-char">
                <img src={ char.thumbnail } alt={ char.name } className="single-char__img"/>
                <div className="single-char__info">
                    <h2 className="single-char__name">{ char.name }</h2>
                    <p className="single-char__descr">{ char.description }</p>
                </div>
                <Link to="/" className="single-char__back">Back to all</Link>
            </div>
        )
    }
}

export default SingleChar;