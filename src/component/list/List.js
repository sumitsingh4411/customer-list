import React, { useEffect, useState } from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import Avatar from '@material-ui/core/Avatar';
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

const List = ({ posts, loading }) => {
  const [max,setmax]=useState(true);
  const [bid, setbids]=useState([]);
  const classes = useStyles();
  if (loading) {
    return <h2>Loading...</h2>;
  }
  
 
  return (
    <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Customer name</TableCell>
          <TableCell align="right"> Email</TableCell>
          <TableCell align="right"> Phone &nbsp;(g)</TableCell>
          <TableCell align="right"> Premium &nbsp;(g)</TableCell>
          <TableCell align="right">Max/Min bid&nbsp;(g)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {posts.map((row) => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row">
              <div style={{display:'flex'}}>
              {row.firstname +"  "+ row.lastname}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Avatar alt={row.firstname} src={row.avatarUrl}/>
              </div>
            </TableCell>
            <TableCell align="right">{row.email}</TableCell>
            <TableCell align="right">{row.phone}</TableCell>
            <TableCell align="right">{row.hasPremium===true? "true":"false"}</TableCell>
            <TableCell align="right">
             <div style={{display:'flex'}} >
              &nbsp;&nbsp;&nbsp;&nbsp;
              <BootstrapSwitchButton checked={true}>max</BootstrapSwitchButton>
             </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
};

export default List;
