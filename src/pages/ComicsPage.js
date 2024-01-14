import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import ComicsList from "../components/comicsList/ComicsList";
import AppBaner from '../components/appBanner/AppBanner';

const ComicsPage = () => {
    return (
        <>
            <AppBaner/>
            <ErrorBoundary>
                <ComicsList/>   
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage;