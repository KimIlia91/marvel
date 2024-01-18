import { useState } from 'react';
import { Formik, ErrorMessage as FormikErrorMessage , Form, useField } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import useMarvelService from '../../services/marvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './searchBar.scss';

const SearchBarInput = ({ label, onChangeChar, loading, firstRequest, ...props }) => {
    
    const [ field ] = useField(props);

    return (
        <>
            <label htmlFor={ props.name }>{ label }</label>
            <div className='search-bar__wrapper'>
                <input 
                    { ...props } 
                    { ...field } 
                    placeholder={ props.placeholder } 
                    onChange={(e) => {
                        field.onChange(e);
                        onChangeChar(null);
                    }}/>
                <button className="button button__main" type='submit' disabled={loading}>
                    <div className="inner">FIND</div>
                </button>
            </div>
            <div className='search-bar__wrapper'>
                {<FormikErrorMessage className='search-bar__message search-bar__message_error' name={ props.name } component='div'/>}
                { 
                    props.char
                        ? <div className='search-bar__message search-bar__message_find'>There is! Visit { props.char.name } page?</div> 
                        : firstRequest 
                            ? <div className='search-bar__message search-bar__message_not-find'>The character was not found. Check the name and try again</div> 
                            : null
                }
                {
                    props.char 
                        ? <Link to={ `/char/${props.char.id}` } className="button button__secondary">
                            <div className="inner">to page</div>
                          </Link>
                        : null
                }
            </div>
        </>
    )
};

const SearchBar = () => {
    const [ char, setChar ] = useState(null);
    const [ firstRequest, setFirstRequest ] = useState(false);

    const { loading, error, getCharactersByName } = useMarvelService();

    const onRequest = (name) => {
        getCharactersByName(name)
            .then(onCharLoaded);
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setFirstRequest(true);
    }

    const onChangeChar = (newValue) => {
        setChar(newValue);
        setFirstRequest(false);
    }

    return (
        <Formik
        initialValues={{
            searchTerms: ''
        }}
        validationSchema={ Yup.object({
            searchTerms: Yup.string()
                .required('This field is required')
        }) }
        onSubmit={ values =>{ onRequest(values.searchTerms) }}
        >
            {
                error 
                    ? <div className="search-bar"><ErrorMessage /></div>
                    : <Form className='search-bar'>
                        {
                            error 
                                ? <div className="search-bar"><ErrorMessage /></div>
                                : <SearchBarInput
                                    label='Or find a character by name:'
                                    placeholder='Enter name'
                                    id='searchTerms' 
                                    name='searchTerms' 
                                    type='text'
                                    char={ char } 
                                    firstRequest={ firstRequest }
                                    onChangeChar={ onChangeChar }
                                    loading={ loading }
                                />
                        }
                       </Form>
            }
        </Formik>        
    )
}

export default SearchBar;