import { useEffect, useState } from 'react';

import useMarvelService from '../../services/marvelService';
import mjolnir from '../../resources/img/mjolnir.png';
import setContant from '../../utils/setContant';
import ProcessStatus from '../../enums/ProcessStatus';

import './randomChar.scss';

const RandomChar = () => {
    const [ char, setChar ] = useState({});

    const { getCharacterByIdAsync, clearError, process, setProcess } = useMarvelService();

    /* eslint-disable*/
    useEffect(() => {
        updateChar();
    }, [])
    /* eslint-disable*/

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1010789 - 1009146) + 1009146);
        clearError();
        getCharacterByIdAsync(id, true)
            .then(onCharLoaded)
            .then(() => setProcess(ProcessStatus.CONFIRMED));
    }
    
    const onCharLoaded = (char) => {
        if (char.code === 404) {
            clearError();
            updateChar();
            return;
        }

        setChar(char);
    }

    return (
        <div className="randomchar">
            { setContant(process, View, char ) }
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={ () => updateChar() }>
                    <div className="inner">try it</div>
                </button>
                <img src={ mjolnir } alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({ data }) => {
    if (!data || Object.keys(data).length === 0) {
        return <div className="randomchar__block"></div>;
    }

    const { thumbnail, name, description, homepage, wiki } = data;
    const imgContainStyle = thumbnail.split('/')[10] === 'image_not_available.jpg' 
                            || '4c002e0305708.gif' === thumbnail.split('/')[10]
                                        ? { objectFit: 'fill' } 
                                        : null;

    const subDesc = description === '' ? 'No description' : description.length > 180 
                                                                ? `${description.slice(0, 180)}...` 
                                                                : description;

    const subName = name.length > 21 ? `${name.slice(0, 21)}...` : name;

    return (
        <div className="randomchar__block">
            <img src={ thumbnail } alt="Random character" className="randomchar__img" style={ imgContainStyle } />
            <div className="randomchar__info">
                <p className="randomchar__name">{ subName }</p>
                <p className="randomchar__descr">
                    { subDesc }
                </p>
                <div className="randomchar__btns">
                    <a href={ homepage } className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={ wiki } className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;