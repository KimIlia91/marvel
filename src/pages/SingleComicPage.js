import SingleComic from '../components/singleComic/SingleComic';
import AppBanner from '../components/appBanner/AppBanner';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';    

const SingleComicPage = () => {
    return (
        <>
            <AppBanner/>
            <ErrorBoundary>
                <SingleComic/> 
            </ErrorBoundary>
        </>
    )
}

export default SingleComicPage;