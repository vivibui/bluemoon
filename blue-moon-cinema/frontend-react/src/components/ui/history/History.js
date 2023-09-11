import React, { useState, useEffect } from 'react';
import { getTransactionHistoryByUserId } from "../../../api/TransactionApi";
// import Table  from '../../ui/table/Table';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Spacer from "../../../Spacer";


const History = (props) => {
    const [history, setHistory] = useState([]);
    const [callingDetail, setCalling] = useState(false);

    const columns = [
      {
        id: 'reservationId',
        label:'Transaction ID',
        field: 'reservationId',
        minWidth: 100,
        width: 100,
        editable: false,
        unSortIcon: true,
        sortable: true,
        filter: true,
        resizable: true, 
      },
      {
        id: 'title',
        label:'Movie Title',
        field: 'title',
        minWidth: 50,
        width: 50,
        editable: false,
        unSortIcon: true,
        sortable: true,
        filter: true,
        resizable: true, 
      },
    
      {
        id: 'num_tickets',
        label:'Number of Tickets',
        field: 'num_tickets',
        minWidth: 100,
        width: 100,
        editable: false,
        unSortIcon: true,
        sortable: true,
        filter: true,
        resizable: true, 
      },

      // {
      //   id: 'customer_name',
      //   label:'Customer Name',
      //   field: 'customer_name',
      //   minWidth: 100,
      //   width: 100,
      //   editable: false,
      //   unSortIcon: true,
      //   sortable: true,
      //   filter: true,
      //   resizable: true, 
      // },

      // {
      //   id: 'billing_address',
      //   label:'Billing Address',
      //   field: 'billing_address',
      //   minWidth: 100,
      //   width: 100,
      //   editable: false,
      //   unSortIcon: true,
      //   sortable: true,
      //   filter: true,
      //   resizable: true, 
      // },

      // {
      //   id: 'zipcode',
      //   label:'Zipcode',
      //   field: 'zipcode',
      //   minWidth: 100,
      //   width: 100,
      //   editable: false,
      //   unSortIcon: true,
      //   sortable: true,
      //   filter: true,
      //   resizable: true, 
      // },

      // {
      //   id: 'email_address',
      //   label:'Email Address',
      //   field: 'email_address',
      //   minWidth: 100,
      //   width: 100,
      //   editable: false,
      //   unSortIcon: true,
      //   sortable: true,
      //   filter: true,
      //   resizable: true, 
      // },
    
      {
        id: 'showDate',
        label:'Show Date',
        field: 'showDate',
        minWidth: 100,
        width: 100,
        editable: false,
        unSortIcon: true,
        sortable: true,
        filter: true,
        resizable: true, 
      },
    
      {
        id: 'showTime',
        label:'Show Time',
        field: 'showTime',
        minWidth: 100,
        width: 100,
        editable: false,
        unSortIcon: true,
        sortable: true,
        filter: true,
        resizable: true, 
      },

      {
        id: 'seating_number',
        label:'Seating Number',
        field: 'seating_number',
        minWidth: 100,
        width: 100,
        editable: false,
        unSortIcon: true,
        sortable: true,
        filter: true,
        resizable: true, 
      },
      {
        id: 'total_cost',
        label:'Total Cost',
        field: 'total_cost',
        minWidth: 100,
        width: 100,
        editable: false,
        unSortIcon: true,
        sortable: true,
        filter: true,
        resizable: true, 
      },
      {
        id: 'reserve_time',
        label:'Reservation Time',
        field: 'reserve_time',
        minWidth: 100,
        width: 100,
        editable: false,
        unSortIcon: true,
        sortable: true,
        filter: true,
        resizable: true, 
      }
    ];
    useEffect(() => {
      const getHistory = () => {
        const historyDetail = async () => {
          if (!callingDetail) {
            setCalling(true);
            const localHistory = await getTransactionHistoryByUserId(props.userId);
            setCalling(false);
            setHistory(localHistory);
          }
        }
        historyDetail();
      };    
      getHistory();
    }, [callingDetail, props.userId]);

    
    // const rows = [history];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

//       return (
//         <div>
//           <Table caption="Reservation History" data={history} columns={columnDefs}/>
//         </div>
//       );
//     }

// export default History;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Spacer height="5rem"/>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ fontWeight: 'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {history
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.reservationId}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={history.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
        <Spacer height="9rem"/>
    </Paper>
  );
}

export default History; 

