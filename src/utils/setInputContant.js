import ProcessStatus from "../enums/ProcessStatus";
import ErrorMessage from "../components/errorMessage/ErrorMessage";

const setInputContant = (process, Component) => {
    switch(process) {
        case ProcessStatus.CONFIRMED:
        case ProcessStatus.LOADING:
        case ProcessStatus.WAITING:
            return <Component />
        case ProcessStatus.ERROR: 
            return <ErrorMessage />
        default:
            throw new Error('No indication of process status!');
    }
}

export default setInputContant;