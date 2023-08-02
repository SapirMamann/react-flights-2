import React, { useEffect } from 'react';
import { useStore, useStoreActions, useStoreState } from 'easy-peasy';


const Trying = () => {
    const username = useStoreState(state => state.user.username);
    const fetchUsername = useStoreActions(actions => actions.user.fetchUsername);

    useEffect(() => {
        console.log("useEffect in trying");
        try {
            fetchUsername();
        } catch (e) {
            console.error('fetching username failed', e)            
        }
    }, []);


    return (
        <div>
            {username}
        </div>
    )
}

export default Trying;