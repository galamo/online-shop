import { useEffect, useState, useTransition } from "react"
import axios from "axios"
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Header } from "../../ui-components/header";
import { WithLoading } from "../../ui-components/with-loading";
import { useNavigate } from "react-router-dom";
import { ICustomer, getAllCustomers } from "./api";
import CustomersTable from "./table";



export default function CustomersPage() {
    const navigate = useNavigate()
    const [customers, setCustomers] = useState<Array<ICustomer>>([])


    useEffect(() => {
        async function getCustomersAction() {
            try {
                const result = await getAllCustomers()
                setCustomers(result)
            } catch (error) {
                alert("error")
            }
        }
        getCustomersAction()
        return () => {
            console.log("Unmount!")
        }
    }, [])
    return <div>
        <Header text="Customers Page" />
        <CustomersTable />
        {/* <Search/> */}
        {/* <Table/> */}
    </div>
}


