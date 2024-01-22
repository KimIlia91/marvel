import Skeleton from "../components/skeleton/Skeleton";
import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
import ProcessStatus from "../enums/ProcessStatus";

const setContant = (process, Component, data) => {
    switch(process) {
        case ProcessStatus.WAITING:
            return <Skeleton />
        case ProcessStatus.LOADING:
            return <Spinner />
        case ProcessStatus.CONFIRMED:
            return <Component data={ data }/>
        case ProcessStatus.ERROR: 
            return <ErrorMessage />
        default:
            throw new Error('No indication of process status!');
    }
}

export default setContant;