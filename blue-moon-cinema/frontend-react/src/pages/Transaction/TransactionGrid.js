import {AgGridReact} from 'ag-grid-react';
import {AllCommunityModules} from 'ag-grid-community';

const columnDefs = [

  {
    headerName:'Transaction ID',
    field: 'transactionId',
    minWidth: 100,
    width: 100,
    editable: false,
    unSortIcon: true,
    sortable: true,
    filter: true,
    resizable: true, 
  },

  {
    headerName:'Movie Title',
    field: 'movieTitle',
    minWidth: 100,
    width: 100,
    editable: false,
    unSortIcon: true,
    sortable: true,
    filter: true,
    resizable: true, 
  },

  {
    headerName:'Purchase Date',
    field: 'purchase_date',
    minWidth: 100,
    width: 100,
    editable: false,
    unSortIcon: true,
    sortable: true,
    filter: true,
    resizable: true, 
  },

  {
    headerName:'Reservation Time',
    field: 'reservationTime',
    minWidth: 100,
    width: 100,
    editable: false,
    unSortIcon: true,
    sortable: true,
    filter: true,
    resizable: true, 
  },

  {
    headerName:'Number of Tickets',
    field: 'numTickets',
    minWidth: 100,
    width: 100,
    editable: false,
    unSortIcon: true,
    sortable: true,
    filter: true,
    resizable: true, 
  },

];

const gridOptions = {
  rowHeight: 33,
  rowSelection:'multiple'
};


export default function TransactionGrid(data){
  const rowData = data.data;

  //const handleSizeColumnsToFit = params => params.api.sizeColumnsToFit();

  return (
<div style={{height:'600px'}} className="ag-theme-balham w-100">
  <AgGridReact
  columnDefs={columnDefs}
  rowData={rowData}
  gridOptions={gridOptions}
  modules={AllCommunityModules}
  //onGridReady={handleSizeColumnsToFit}
  />
</div>


  );

}