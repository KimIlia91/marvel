import { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/marvelService';
import setContant from '../../utils/setContant';
import ProcessStatus from '../../enums/ProcessStatus';

import './charInfo.scss';

const CharInfo = (props) => {

    const [ char, setChar ] = useState(null);
    const { process, setProcess, getCharacterByIdAsync, clearError } = useMarvelService();

    /* eslint-disable */
    useEffect(() => {
        updateChar();
    }, [props.charId])
    /* eslint-disable */

    const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }

        clearError();
        getCharacterByIdAsync(charId)
            .then(onCharLoaded)
            .then(() => setProcess(ProcessStatus.CONFIRMED));
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    return (
        <div className="char__info">
            { setContant(process, View, char) }
        </div>
    )
}

const View = ({ data }) => {
    const { thumbnail, name, homepage, wiki, description, comics } = data;
    const imgContainStyle = thumbnail.split('/')[10] === 'image_not_available.jpg' 
                         || thumbnail.split('/')[10] === '4c002e0305708.gif'
                                        ? { objectFit: 'fill' } 
                                        : null;

    const subDesc = description === '' ? 'No description' : description.length > 240 
                                                                ? `${description.slice(0, 240)}...` 
                                                                : description;

    const elements = comics.length > 0 ? comics.slice(0, 10).map((elem, i) => {
        return (
            <li key={ i } className="char__comics-item">
                { elem.name }
            </li>
        )
    }) : "No information";

    return (
        <Fragment>
            <div className="char__basics">
                <img src={ thumbnail } alt={ name } style={ imgContainStyle }/>
                <div className='char__info-group'>
                    <div className="char__info-name">{ name }</div>
                    <div className="char__btns">
                        <a href={ homepage } className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={ wiki } className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                { subDesc }
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                { elements }
            </ul>
        </Fragment>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;


    // const skeleton = char || loading || error ? null : <Skeleton/>; 
    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || error || !char) ? <View char={ char }/> : null;