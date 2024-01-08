import { Component, Fragment } from 'react';
import MarvelService from '../../services/marvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const { charId } = this.props;
        console.log('update');
        if (!charId) {
            return;
        }

        this.onCharLoading();
        this.marvelService
            .getCharacterByIdAsync(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onCharLoaded = (char) => {
        this.setState({ char, loading: false });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    render() {
        const { char, loading, error } = this.state;

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
}

const View = ({ char }) => {
    const { thumbnail, name, homepage, wiki, description, comics } = char;
    const imgContainStyle = thumbnail.split('/')[10] === 'image_not_available.jpg' 
                                        ? { objectFit: 'fill' } 
                                        : null;

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
                    <div>
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
                    { description }
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    { elements }
                </ul>
        </Fragment>
    )
}

export default CharInfo;