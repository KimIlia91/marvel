import { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';

const CharInfo = (props) => {

    const [ char, setChar ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }

        onCharLoading();
        marvelService
            .getCharacterByIdAsync(charId)
            .then(onCharLoaded)
            .catch(onError);
    }

    const onCharLoading = () => {
        setLoading(true);
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const skeleton = char || loading || error ? null : <Skeleton/>; 
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={ char }/> : null;

    return (
        <div className="char__info">
            { skeleton } { errorMessage } { spinner } { content }
        </div>
    )
}

const View = ({ char }) => {
    const { thumbnail, name, homepage, wiki, description, comics } = char;
    const imgContainStyle = char.thumbnail.split('/')[10] === 'image_not_available.jpg' 
                         || char.thumbnail.split('/')[10] === '4c002e0305708.gif'
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