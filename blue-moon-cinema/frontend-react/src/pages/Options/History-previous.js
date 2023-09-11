import Layout from "../../components/ui/Layout";
import React, { useState, useEffect } from 'react';
//import Card from 'react-bootstrap/Card';
//import Col from 'react-bootstrap/Col';
//import Row from 'react-bootstrap/Row';
import { getTransactionHistoryByUserId } from "../../api/TransactionApi";
//import { getMovieDetail } from "../../../src/api/MovieApi";
//import Spacer from "../../Spacer";
import TransactionGrid from "../Transaction/TransactionGrid";


const History = (props) => {
   const [history, setHistory] = useState([]);

   useEffect(() => {
//     const getTransaction = () => {
       const history = async () => {
//         if (!callingDetail) {
//           setCalling(true); 
           const TransHistory = await getTransactionHistoryByUserId(props.id);
//           setCalling(false);
           setHistory(TransHistory);
//         }
      } 
      if (history.length === 0){
        setHistory();
      }
     }, [ props.id]);


  return (
     <Layout>
        <TransactionGrid TransHistory = {history}> </TransactionGrid> 
     </Layout>

  );

}

export default History;