import './charList.scss';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/spinner';
import { Component, Fragment } from 'react';
import MarvelService from '../../services/marvelService';

class CharList extends Component {
    state = {
        characters: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    getCharacters = () => {
        this.marvelService
            .getAllCharactersAsync()
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    onCharLoaded = (characters) => {
        this.setState({ characters, loading: false });
    }

    componentDidMount() {
        this.getCharacters();
    }

    render() {
        const { characters, loading, error } = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={ characters }/> : null;

        return (
            <div className="char__list">
                { errorMessage } { spinner } { content }
            </div>
        )
    }
}

const View = ({ characters }) => {
    const elements = characters.forEach(char => {
        <li className="char__item" key={ char.id }>
            <img src={ char.thumbnail } alt={ char.name }/>
            <div className="char__name">{ char.name }</div>
        </li>
    });

    return (
        <Fragment>
            <ul className="char__grid">
                { elements }
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </Fragment>
    )
}

export default CharList;