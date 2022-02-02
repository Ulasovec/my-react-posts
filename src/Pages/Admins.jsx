import React from 'react';
import Header from "../components/Header/Header";
import {useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {useParams} from "react-router-dom";
import Avatar from '../Img/admin.jpg'
import Articles from "../components/Articles";

const Admins = () => {

    const query = useQuery('admins', getAdmins);
    const params=useParams();

    async function getAdmins() {
        const response = await axios.get(`http://localhost:1337/api/admins/${params.id}?populate=cover`);
        console.log('GET: ', response.data);
        return response.data;

    }
    return (
        <div>
            <Header/>
            <main>
            <h2> Администратор : {query.data?.data.attributes.Name}</h2>
                <p>Вы можете писать статьи.</p>
                <div className='main__img'><img src={Avatar} alt="Avatar"/></div>
             <Articles/>

            </main>



        </div>
    );
};

export default Admins;