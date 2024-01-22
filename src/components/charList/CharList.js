import { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/marvelService';
import setListContant from '../../utils/setListContant';
import ProcessStatus from '../../enums/ProcessStatus';

import './charList.scss';

const CharList = (props) => {
    const [ characters, setCharacters ] = useState([]);
    const [ newItemLoading, setNewItemLoading ] = useState(false);
    const [ offset, setOffset ] = useState(210);
    const [ charEnded, setCharEnded ] = useState(false);

    const { getAllCharactersAsync, process, setProcess } = useMarvelService();

    /*eslint-disable*/
    useEffect(() => {
        onRequest(offset, true);
    }, []);
    /*eslint-disable*/

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharactersAsync(offset)
            .then(onCharLoaded)
            .then(() => setProcess(ProcessStatus.CONFIRMED));
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

    const elementsMemo = useMemo(() => {
        return setListContant(process, () => 
            <View 
                characters={ characters } 
                onCharSelected={ onCharSelected } 
                focusOnSelectedChar={ focusOnSelectedChar }
                charRefs={ charRefs }
            />, 
            newItemLoading)
    }, [process])

    return (
        <div className="char__list">
            { elementsMemo }
            <button 
                className="button button__main button__long"
                disabled={ newItemLoading }
                onClick={ () => onRequest(offset, false) }
                style={ { 'display': charEnded ? 'none' : 'block' }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

function View ({ characters, onCharSelected, focusOnSelectedChar, charRefs }) {
    const elements = characters.map((char, i) => {
        const imgContainStyle = char.thumbnail.split('/')[10] === 'image_not_available.jpg' 
                            || char.thumbnail.split('/')[10] === '4c002e0305708.gif'
                                    ? { objectFit: 'fill' } 
                                    : null;
                        
        return (
            <li 
                className="char__item" 
                tabIndex={0} 
                key={ char.id } 
                ref={ el => charRefs.current[i] = el }
                onClick={ () => { onCharSelected(char.id); focusOnSelectedChar(i); }}
                onKeyDown={ (e) => {
                    if (e.key === ' ' || e.key === "Enter") {
                        onCharSelected(char.id);
                        focusOnSelectedChar(i);
                    }
                }}
            >
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
        </>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;