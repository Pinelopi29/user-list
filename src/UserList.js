import './App.css';
import { useQuery, gql } from '@apollo/client';
import history from './history';
import React from 'react';
import ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
  

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, button) {
  return { name, button };
}

const query = gql`
query users{
    users {
      data {
        username
        id
        website
        phone
        email
        address {
          street
          suite
          city
          zipcode
        }
      }
    }
  }
`;



function UserList() {  
  const { loading, error, data } = useQuery(query);
  const classes = useStyles();
  const rows = [];
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
    data.users.data.map((item, index) => (
      <p key={item.id}>
      {rows.push(createData(item.username ,
        <button  onClick={() => history.push(
        { 
        pathname: '/User',
        search: '?query=abc',
        state: { detail: item }
        }
      
        )}>User Details</button>))
        }
     
      </p>
    ))
    console.log(rows); 
    console.log(data.users);
  return (
    <div className="UserList">
      {
        
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>username</TableCell>
                  <TableCell align="right"></TableCell>

                  <TableCell align="right">Button</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.username}</TableCell>
              <TableCell align="right">{row.button}</TableCell>
         
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        
 
      }
     
    </div>
  )
  console.log(rows);
}

export default UserList;