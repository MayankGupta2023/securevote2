import React from 'react'
import { useRouter, useState, useEffect } from 'next/router';
import Forbidden from './forbidden';
import Login from './login';





const access_or_forbidden = (props) => {

    const { ORG, org_access, IP } = props;




    return (
        <div>

            {ORG === org_access ? <Login /> : <Forbidden ORG={ORG} IP={IP} />}

        </div>
    )
}

export default access_or_forbidden
