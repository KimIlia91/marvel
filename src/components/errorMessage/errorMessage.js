import imgError from './error.gif';
import './errorMessage.scss';

const ErrorMessage = () => {
    return (
        <img src={ imgError } alt="error img" className='error-message'/>
    )
}

export default ErrorMessage;