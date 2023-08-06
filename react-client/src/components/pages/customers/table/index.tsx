import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ICustomer } from '../api';
import { useContext } from 'react';
import { UTCContext } from '../../../../App';


export default function CustomersTable(props: { customers: Array<ICustomer>, extended?: boolean }) {
    const { extended = true } = props
    const value = useContext(UTCContext)
    if (!props.customers[0]) return null;
    const columns = [<Column field={"id"} header={"id"}></Column>,
    <Column field={"name"} header={"name"}></Column>,
    <Column field={"city"} header={"city"}></Column>]
    const customersAfterUtc = props.customers.map((currentCustomer) => {
        if (value.isUtc) {
            return { ...currentCustomer, createdAt: new Date(currentCustomer.createdAt).toUTCString() }
        } else {
            return { ...currentCustomer, createdAt: new Date(currentCustomer.createdAt).toLocaleString() }
        }
    })
    return <div>
        <div className="card">
            <DataTable value={customersAfterUtc} tableStyle={{ minWidth: '50rem' }}>
                {extended ?
                    Object.keys(customersAfterUtc[0]).map(key => {
                        return <Column field={key} header={key}></Column>
                    })
                    : columns
                }
            </DataTable>
        </div>
    </div>
} 