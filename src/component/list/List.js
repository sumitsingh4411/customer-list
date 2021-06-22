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
import Modal from '@material-ui/core/Modal';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))
const List = ({ posts, loading, arr, arrs }) => {
  const [max, setmax] = useState(true);
  const classes = useStyles();
  const [id, setid] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (loading) {
    return <h2>Loading...</h2>;
  }


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow onClick={handleOpen} style={{cursor:'pointer'}}>
            <TableCell>Customer name</TableCell>
            <TableCell align="right"> Email</TableCell>
            <TableCell align="right"> Phone &nbsp;(g)</TableCell>
            <TableCell align="right"> Premium &nbsp;(g)</TableCell>
            <TableCell align="right">Max/Min bid&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((row, i) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <div style={{ display: 'flex' }}>
                  {row.firstname + "  " + row.lastname}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Avatar alt={row.firstname} src={row.avatarUrl} />
                </div>
              </TableCell>
              <TableCell align="right">{row.email}</TableCell >
              <TableCell align="right" >{row.phone}</TableCell>
              <TableCell align="right">{row.hasPremium === true ? "true" : "false"}</TableCell>
              <TableCell align="right">
                <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
                  <BootstrapSwitchButton key={row.id} checked={true} onChange={() => { setmax(!max); setid(row.id) }}>max</BootstrapSwitchButton>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {
                    (max === true && row.id === id) ? arr[i] : arrs[i]
                  }
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    <div style={modalStyle} className={classes.paper}>
                      <h2 id="simple-modal-title">{row.firstname + "  " + row.lastname}</h2>
                      <p id="simple-modal-description">
                        {row.bids.map(e=>{
                          <p>{e.amount}</p>
                        })}
                      </p>
                  </div>
                  </Modal>
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
