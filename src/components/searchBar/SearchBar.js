import { useMemo, useState } from 'react';
import { Formik, ErrorMessage as FormikErrorMessage , Form, useField } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import useMarvelService from '../../services/marvelService';
import setInputContant from '../../utils/setInputContant';
import ProcessStatus from '../../enums/ProcessStatus';

import './searchBar.scss';

const SearchBarInput = ({ onChangeChar, process, firstRequest, char }) => {
    const [ field ] = useField({ name: 'searchTerms'  });

    return (
        <>
            <label htmlFor='searchTerms'>Or find a character by name:</label>
            <div className='search-bar__wrapper'>
                <input 
                    { ...field } 
                    id='searchTerms' 
                    type='text'
                    placeholder='Enter name' 
                    onChange={(e) => {
                        field.onChange(e);
                        onChangeChar(null);
                    }}/>
                <button 
                    className="button button__main" 
                    type='submit' 
                    disabled={ !(process === ProcessStatus.CONFIRMED || process === ProcessStatus.WAITING) }
                >
                    <div className="inner">FIND</div>
                </button>
            </div>
            <div className='search-bar__wrapper'>
                {
                    <FormikErrorMessage 
                        className='search-bar__message search-bar__message_error' 
                        name='searchTerms' 
                        component='div'
                    />
                }
                { 
                    char
                        ? <div className='search-bar__message search-bar__message_find'>There is! Visit { char.name } page?</div> 
                        : firstRequest 
                            ? <div className='search-bar__message search-bar__message_not-find'>The character was not found. Check the name and try again</div> 
                            : null
                }
                {
                    char 
                        ? <Link to={ `/char/${char.id}` } className="button button__secondary">
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

    const { getCharactersByName, process, setProcess } = useMarvelService();

    const onRequest = (name) => {
        getCharactersByName(name)
            .then(onCharLoaded)
            .then(() => setProcess(ProcessStatus.CONFIRMED));
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setFirstRequest(true);
    }

    const onChangeChar = (newValue) => {
        setChar(newValue);
        setFirstRequest(false);
    }

    const element = useMemo(() => {
        return setInputContant(process, () =>  
            <SearchBarInput
                onChangeChar={onChangeChar}
                process={process}
                firstRequest={firstRequest}
                char={char}
            />)
    }, [process])

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
            <Form className='search-bar'>
                { element }
            </Form>
        </Formik>        
    )
}

export default SearchBar;