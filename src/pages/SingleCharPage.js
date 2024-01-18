import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import AppBaner from '../components/appBanner/AppBanner';
import SingleChar from "../components/singleChar/SingleChar";

const SingleCharPage = () => {
    return (
        <>
            <AppBaner/>
            <ErrorBoundary>
                <SingleChar/>   
            </ErrorBoundary>
        </>
    )
}

export default SingleCharPage;