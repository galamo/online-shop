import './App.css'
import { useState } from "react"
import { Header } from './components/ui-components/header'
import CountriesPage from './components/pages/countries'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { Button } from 'primereact/button'
import LoginForm from './components/pages/login'
import NotFound from './components/pages/not-found'

interface IRoute {
    path: string,
    key: string,
    component: any,
    label?: string
}
const routes: Array<IRoute> = [
    {
        path: "/login",
        component: <LoginForm />,
        key: "login",
        label: "Login"
    },
    {
        path: "/countries",
        component: <CountriesPage />,
        key: "countries",
        label: "Countries"
    },
    {
        path: "*",
        component: <NotFound />,
        key: "not found",
    }
]


function App() {
    return (
        <div>
            <BrowserRouter>
                {routes.filter(r => r.label).map((route: IRoute) => {
                    return <Link key={route.label} to={route.path} > {route.label} </Link>
                })}
                <Routes>
                    {routes.map((route: IRoute) => {
                        return <Route path={route.path} key={route.key} element={route.component} />
                    })}
                </Routes>
            </BrowserRouter>
        </div>
    )
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