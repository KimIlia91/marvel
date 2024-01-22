import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import useMarvelService from '../../services/marvelService';
import setContant from '../../utils/setContant';
import ProcessStatus from '../../enums/ProcessStatus';

import './singleComic.scss';

const SingleComicPage = () => {
    const { comicId } = useParams();
    const [ comic, setComic ] = useState(null);
    const { getComicByIdAsync, clearError, process, setProcess } = useMarvelService();

    /*eslint-disable*/
    useEffect(() => {
        updateComic();
    }, [comicId])
    /*eslint-disable*/

    const updateComic = () => {
        clearError();
        getComicByIdAsync(comicId)
            .then(onComicLoaded)
            .then(() => setProcess(ProcessStatus.CONFIRMED));
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    return (
        <>
            { setContant(process, View, comic) }
        </>
    )
}

function View({ data }) {
    return (
        <div className="single-comic">
            <img src={ data.thumbnail } alt={ data.title } className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{ data.title }</h2>
                <p className="single-comic__descr">{ data.description }</p>
                <p className="single-comic__descr">{ data.pages }</p>
                <p className="single-comic__descr">Language: { data.language }</p>
                <div className="single-comic__price">{ data.price }</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;