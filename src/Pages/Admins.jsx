import React, {useEffect} from 'react';
import Header from "../components/Header/Header";
import {useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {useParams} from "react-router-dom";
import Avatar from '../Img/admin.jpg'
import Articles from "../components/Articles";
import {useDispatch, useSelector} from "react-redux";
import {setAdmins} from "../app/features/admins/AdminsSlice";


const Admins = () => {

    const query = useQuery('admins', getAdmins);
    const params = useParams();
    // const admins = useSelector(state=> state.admins.value);
    const dispatch = useDispatch();

    async function getAdmins() {
        const response = await axios.get(`http://localhost:1337/api/admins/${params.id}`);
        console.log('GET: ', response.data);
        return response.data;
    }

    useEffect(() => dispatch(setAdmins({name: query.data?.data.attributes.Name})), [query.isLoading]);

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