import React, { useEffect, useState } from "react";

import http from '../http';

function CheckGroup({children, groups}){

    const [isVisible, setVisible]  = useState(false)

    useEffect(() => {

        http.get('http://localhost:8000/api/groups/check/',
            {params: {
                groups: groups.join(", ")       //replace "+" with "_" maybe in airline company
            }}
        )
            .then(response => setVisible(response.data.result))
            .catch(error => console.log(error));
    }, []);

    return(
        isVisible && children       //If isvisible is True => show the edit buttons..
    );
}



function PermissionDenied() {
    return <h2>You don't have permission to view this page.</h2>;
  }



export {CheckGroup, PermissionDenied};