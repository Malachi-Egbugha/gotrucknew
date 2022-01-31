import React, {useState} from 'react'
import Spinner from './Spinner';

const useSpinner = prop => {

    const [visible, setVisible] = useState(false);

    const showSpinner = () => setVisible(true)
    const hideSipnner = () => setVisible(false)
    const spinner = visible ? <Spinner/> : null;

    return [spinner, showSpinner, hideSipnner]
    
}

export default useSpinner
