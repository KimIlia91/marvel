import { Component, Fragment } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {
    state = {
        characters: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharactersAsync(offset)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    onCharLoaded = (newCharacters) => {
        let ended = false;

        if (newCharacters.length < 9) {
            ended = true;
        }

        this.setState(({ offset, characters }) => ({ 
            characters: [...characters, ...newCharacters], 
            loading: false, 
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }));
    }

    render() {
        const { characters, loading, error, offset, newItemLoading, charEnded } = this.state;
        const { onCharSelected } = this.props;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View characters={ characters } 
                                                    onCharSelected={ onCharSelected }
                                                    offset={ offset }
                                                    newItemLoading={ newItemLoading }
                                                    onRequest={ this.onRequest }
                                                    charEnded={ charEnded }/> : null;

        return (
            <div className="char__list">
                { errorMessage } { spinner } { content }
            </div>
        )
    }
}

const View = ({ characters, onCharSelected, offset, newItemLoading, onRequest, charEnded }) => {
    const elements = characters.map(char => {
        const imgContainStyle = char.thumbnail.split('/')[10] === 'image_not_available.jpg' 
                             || char.thumbnail.split('/')[10] === '4c002e0305708.gif'
                                        ? { objectFit: 'fill' } 
                                        : null;
        return (
            <li className="char__item" key={ char.id } onClick={ () => onCharSelected(char.id) }>
                <img src={ char.thumbnail } alt={ char.name } style={ imgContainStyle }/>
                <div className="char__name">{ char.name }</div>
            </li>
        )
    });

    return (
        <Fragment>
            <ul className="char__grid">
                { elements }
            </ul>
            <button className="button button__main button__long"
                    disabled={ newItemLoading }
                    onClick={ () => onRequest(offset) }
                    style={ {'display': charEnded ? 'none' : 'block' } }>
                <div className="inner">load more</div>
            </button>
        </Fragment>
    )
}

export default CharList;