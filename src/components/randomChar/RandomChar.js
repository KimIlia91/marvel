import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import mjolnir from '../../resources/img/mjolnir.png';
import './randomChar.scss';

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1010789 - 1009146) + 1009146);
        this.onCharLoading();
        this.marvelService
            .getCharacterByIdAsync(id, true)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharLoading = () => {
        this.setState({
            loading: true,
            error: false
        })
    }
    
    onCharLoaded = (char) => {
        if (char.code === 404) {
            this.updateChar();
            return;
        }

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
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={ char }/> : null;
        
        return (
            <div className="randomchar">
                { errorMessage } {spinner} { content }
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={ this.updateChar }>
                        <div className="inner">try it</div>
                    </button>
                    <img src={ mjolnir } alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({ char }) => {
    const { thumbnail, name, description, homepage, wiki } = char;
    const imgContainStyle = char.thumbnail.split('/')[10] === 'image_not_available.jpg' 
                            || '4c002e0305708.gif' === char.thumbnail.split('/')[10]
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