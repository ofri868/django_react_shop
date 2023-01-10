import React, { useEffect, useState } from "react";
import axios from "axios";
import Register from "./Register";

const App = () => {
    const SERVER = "http://127.0.0.1:8000/";
    const [username, setuname] = useState("")
    const [products, setproducts] = useState([])
    const [password, setpassword] = useState("")
    const [myToken, setmytoken] = useState("")
    const [logged, setlogged] = useState(false)
    const getTasks = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${myToken}`
            }
        };

        await axios.get(SERVER + "products", config).then((res) => setproducts(res.data));
    };

    // useEffect(() => {
    //     if (myToken)
    //         getTasks();
    // }, [myToken]);

    useEffect(() => {
        if (myToken)
            setlogged(true)
    }, [myToken]);

    const login = () => {
        axios.post(SERVER + "login/", { username, password })
            .then((res) => setmytoken(res.data.access));
    };

    return (
        <div>
            {logged && 'welcome ' + username}<hr/>
            User name: <input onChange={(e) => setuname(e.target.value)} />
            Password: <input onChange={(e) => setpassword(e.target.value)} />
            <button onClick={() => login()}>Login</button>
            <button onClick={() => getTasks()}>get data</button>

            {products.map((prod, i) => (
                <div key={i}>
                    desc: {prod.desc},price: {prod.price}
                </div>
            ))}
            <Register></Register>
        </div>
    );
};

export default App;