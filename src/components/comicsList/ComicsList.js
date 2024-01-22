import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/marvelService';
import ProcessStatus from '../../enums/ProcessStatus';
import setListContant from '../../utils/setListContant';

import './comicsList.scss';

const ComicsList = () => {
    
    const [ comics, setComics ] = useState([]);
    const [ offset, setOffset ] = useState(210);
    const [ newItemLoading, setNewItemLoading ] = useState(false);
    const [ comicsEnded, setComicsEnded ] = useState(false);

    const { getAllComicsAsync, process, setProcess } = useMarvelService();

    /* eslint-disable */
    useEffect(() => {
        onRequest(offset, true);
    }, []) 
    /* eslint-disable */

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComicsAsync(offset)
            .then(onComicsLoaded)
            .then(() => setProcess(ProcessStatus.CONFIRMED));
    }

    const onComicsLoaded = (newComics) => {
        let ended = false;
        
        if (newComics.length < 8) {
            ended = true;
        }

        setComics(comics => [...comics, ...newComics]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 8);
        setComicsEnded(comicsEnded => ended);
    }

    return (
        <div className="comics__list">
            { setListContant(process, () => renderElements(comics), newItemLoading) }
            <button disabled={ newItemLoading }
                    onClick={ () => onRequest(offset) }
                    style={ { 'display': comicsEnded ? 'none' : 'block' } }
                    className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

function renderElements(comics) {
    const elements = comics.map((item, i) => {    
        return (
            <li key={ item.id } className="comics__item">
                <Link to={ `/comics/${item.id}` } tabIndex={-1}>
                    <img 
                        tabIndex={0} 
                        src={ item.thumbnail } 
                        alt={ item.title } 
                        className="comics__item-img"
                    />
                    <div className="comics__item-name">{ item.title }</div>
                    <div className="comics__item-price">{ item.price }</div>
                </Link>
            </li>
        )
    });

    return (
        <ul className="comics__grid">
            { elements }  
        </ul>
    )
}

export default ComicsList;