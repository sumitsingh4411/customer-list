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
  const [max, setmax] = useState(true);
  const [bid, setbids] = useState([]);
  const [sbid, ssetbids] = useState(1000000);
  const [mbid, msetbids] = useState(-1000000);
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
                <div style={{ display: 'flex' }}>
                  {row.firstname + "  " + row.lastname}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Avatar alt={row.firstname} src={row.avatarUrl} />
                </div>
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.hasPremium === true ? "true" : "false"}</TableCell>
              <TableCell align="right">
                <div style={{ display: 'flex' }} >
                  {
                    row.bids.map(e=>{
                       if(e.amount>mbid)
                         msetbids(e.amount);
                       if(e.amout<sbid)
                         ssetbids(e.amount);
                          
                    })
                  }
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {
                     mbid!==1000000 && sbid!==-1000000 &&  max===true  ? sbid : mbid
                  }
                  <BootstrapSwitchButton checked={true} onChane={()=>{setmax(false)}}>max</BootstrapSwitchButton>
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
