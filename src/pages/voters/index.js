import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Forbidden from '../../components/forbidden';
import Loading from '../../components/loading';
import Access_or_forbidden from '@/components/access_or_forbidden';

const index = () => {

    const [ORG, setORG] = useState('');
    const [IP, setIP] = useState('');
    const [loading, setLoading] = useState(false);
    const org_access = "Shiv Nadar University";

    useEffect(() => {

        getUserIP();

    }, []);

    const getUserIP = async () => {
        const ip = await axios.get("https://ipapi.co/json");
        console.log(ip.data);
        setORG(ip.data.org);
        setIP(ip.data.ip);
        setLoading(true);
    }


    return (
        <div>
            <div>
                {!loading ? <Loading /> : <Access_or_forbidden ORG={ORG} IP={IP} org_access={org_access} />}
            </div>

        </div>
    )
}

export default index
