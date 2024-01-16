import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = (props) => {
    const [ characters, setCharacters ] = useState([]);
    const [ newItemLoading, setNewItemLoading ] = useState(false);
    const [ offset, setOffset ] = useState(210);
    const [ charEnded, setCharEnded ] = useState(false);

    const { loading, error, getAllCharactersAsync } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharactersAsync(offset)
            .then(onCharLoaded);
    }

    const onCharLoaded = (newCharacters) => {

        let ended = false;

        if (newCharacters.length < 9) {
            ended = true;
        }

        setCharacters(characters => [...characters, ...newCharacters]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }
    
    const charRefs = useRef([]);

    const focusOnSelectedChar = (id) => {
        charRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        charRefs.current[id].classList.add('char__item_selected');
        charRefs.current[id].focus();
    }

    const { onCharSelected } = props;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    const content = <View characters={ characters } 
                          onCharSelected={ onCharSelected }
                          offset={ offset }
                          newItemLoading={ newItemLoading }
                          onRequest={ onRequest }
                          charEnded={ charEnded }
                          focusOnSelectedChar={ focusOnSelectedChar }
                          charRefs={ charRefs }/>;

    return (
        <div className="char__list">
            { errorMessage } { spinner } { content }
        </div>
    )
}

function View ({ characters, 
    onCharSelected, 
    offset, 
    newItemLoading, 
    onRequest, 
    charEnded, 
    focusOnSelectedChar, 
    charRefs }) {

    const elements = characters.map((char, i) => {
    const imgContainStyle = char.thumbnail.split('/')[10] === 'image_not_available.jpg' 
                        || char.thumbnail.split('/')[10] === '4c002e0305708.gif'
                                ? { objectFit: 'fill' } 
                                : null;
                        
        return (
            <li className="char__item" 
                tabIndex={0} 
                key={ char.id } 
                ref={ el => charRefs.current[i] = el }
                onClick={ () => { onCharSelected(char.id); focusOnSelectedChar(i); }}
                onKeyDown={ (e) => {
                    if (e.key === ' ' || e.key === "Enter") {
                        onCharSelected(char.id);
                        focusOnSelectedChar(i);
                    }
                } }>
                <img src={ char.thumbnail } alt={ char.name } style={ imgContainStyle }/>
                <div className="char__name">{ char.name }</div>
            </li>
        )
    });

    return (
        <>
            <ul className="char__grid">
                { elements }
            </ul>
            <button className="button button__main button__long"
                    disabled={ newItemLoading }
                    onClick={ () => onRequest(offset, false) }
                    style={ { 'display': charEnded ? 'none' : 'block' } }>
                <div className="inner">load more</div>
            </button>
        </>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;