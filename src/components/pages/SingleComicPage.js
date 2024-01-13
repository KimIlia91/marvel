import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import AppBaner from '../appBanner/AppBanner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import './singleComicPage.scss';

const SingleComicPage = () => {
    const { comicId } = useParams();
    const [ comic, setComic ] = useState({});
    const { loading, error, getComicByIdAsync, clearError } = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId])

    const updateComic = () => {
        clearError();
        getComicByIdAsync(comicId)
            .then(onComicLoaded);
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={ comic }/> : null;

    return (
        <>
            <AppBaner/>
            { errorMessage } { spinner } { content }
        </>
    )

    function View({ comic }) {
        return (
            <div className="single-comic">
                <img src={ comic.thumbnail } alt={ comic.title } className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{ comic.title }</h2>
                    <p className="single-comic__descr">{ comic.description }</p>
                    <p className="single-comic__descr">Pages: { comic.pages }</p>
                    <p className="single-comic__descr">Language: { comic.language }</p>
                    <div className="single-comic__price">{ comic.price }</div>
                </div>
                <Link to="/" className="single-comic__back">Back to all</Link>
            </div>
        )
    }
}

export default SingleComicPage;