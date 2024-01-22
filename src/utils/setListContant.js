import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
import ProcessStatus from "../enums/ProcessStatus";

const setListContant = (process, Component, newItemLoading) => {
    switch(process) {
        case ProcessStatus.WAITING:
            return <Spinner />
        case ProcessStatus.LOADING:
            return newItemLoading ? <Component /> : <Spinner />
        case ProcessStatus.CONFIRMED:
            return <Component />
        case ProcessStatus.ERROR: 
            return <ErrorMessage />
        default:
            throw new Error('No indication of process status!');
    }
}

export default setListContant;