import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";
import AppBaner from '../appBanner/AppBanner';

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