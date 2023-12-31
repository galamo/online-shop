import './App.css'
import { createContext, useState } from 'react'
import CountriesPage from './components/pages/countries'
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { Button } from 'primereact/button'
import LoginForm from './components/pages/login'
import NotFound from './components/pages/not-found'
import RegistrationComponent from './components/pages/signup'
import { ProtectedRoute } from './components/ui-components/protected-route'
import CustomersPage from './components/pages/customers'
import ProductsPage from './components/pages/products'
import { InputSwitch } from 'primereact/inputswitch';


import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import AddProductPage from './components/pages/addProduct'


console.log("test")
interface IRoute {
    path: string,
    key: string,
    component: any,
    label?: string,
    onlyAdmin?: boolean
}
const routes: Array<IRoute> = [
    {
        path: "/login",
        component: <LoginForm />,
        key: "login",

    },
    {
        path: "/countries",
        component: <ProtectedRoute><CountriesPage /></ProtectedRoute>,
        key: "countries",
        label: "Countries",

    },
    {
        path: "/signup",
        component: <RegistrationComponent />,
        key: "signup",
        label: "Signup"
    },
    {
        path: "/customers",
        component: <CustomersPage />,
        key: "customers",
        label: "Customers",
    },
    {
        path: "/products",
        component: <ProductsPage />,
        key: "products",
        label: "Products"
    },
    {
        path: "/add-product",
        component: <AddProductPage />,
        label: "Add Product",
        key: "AddProductPage",
        onlyAdmin: true
    },
    {
        path: "*",
        component: <NotFound />,
        key: "not found",
    }

]

function OnlyAdmin(props: any) {
    const { Component } = props
    if (localStorage.getItem("role") === "admin") {
        return <Component />
    } else {
        return <></>
    }
}

export const UTCContext = createContext<{ isUtc: boolean }>({ isUtc: true })

function App() {
    const navigate = useNavigate();
    const [isUtc, setIsUtc] = useState(false)
    function logoutHandler() {
        navigate("/login")
    }

    return (
        <UTCContext.Provider value={{ isUtc }}>
            <div>
                <div>
                    <h5>  Utc time?</h5>
                    <InputSwitch checked={isUtc} onChange={(__avi_stop__) => {
                        setIsUtc(!isUtc)
                    }} />
                </div>
                <div>
                    <h5>  Format? Use DateFNS - https://date-fns.org/v1.29.0/docs/format</h5>
                    <div>
                        <input id="formatA" type='radio' name="format" /> yyyy-MMM-dd HH:mm:SS
                    </div>
                    <div>
                        <input id="formatB" type='radio' name="format" /> yy/MM/dd HH:mm:SS
                    </div>
                </div>
                <div >
                    <Button onClick={logoutHandler}> Log Out</Button>
                </div>
                <div >
                    <div >
                        {routes.filter(showRoutesPerRole).filter(r => r.label).map((route: IRoute) => {
                            return <Link key={route.label} to={`${route.path}`} > {route.label} </Link>
                        })}
                    </div>
                    <Routes>
                        {routes.map((route: IRoute) => {
                            return <Route path={route.path} key={route.key} element={route.component} />
                        })}
                    </Routes>
                </div>
            </div>
        </UTCContext.Provider>
    )
}

function showRoutesPerRole(route: IRoute) {
    return true;
    // check only users that have admin OR regular users.

    // if (localStorage.getItem("role") !== "admin") return true
    // return route.onlyAdmin && localStorage.getItem("role") === "admin"
}



export default App


// class Test {
//     constructor(_name) {
//         this.name = _name
//     }
//     setName(newName) {
//         this.name = newName
//     }
//     getName() {
//         return this.name
//     }
// }