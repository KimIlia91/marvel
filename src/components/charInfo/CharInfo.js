import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false,
        offsetTop: 0
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