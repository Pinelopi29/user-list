import React from "react";
import { useQuery, gql } from '@apollo/client';
import history from './history';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import CheckboxListSecondary from './toDoList';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexDirection: "row"
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary
  }
}));

const query = gql`
query USER($id: ID!){
    user(id: $id) {
      id
      username
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
`;




const User = () => {
    const id = history.location.state.detail.id;
    console.log(history);
    const { loading, error, data } = useQuery(query, {
        variables: { id },
      });
    //console.log(data.username);
    const classes = useStyles();

    const mystyle = {
      textAlign: "left",
      fontWeight: "bold"
    };
    const stylewithbord = {
      textAlign: "left",
      fontWeight: "bold",
      borderBottom: "3px solid rgb(212, 212, 212)",
      
    };
    const stylewithbordTop = {
      textAlign: "left",
      fontWeight: "bold",
      borderTop: "3px solid rgb(212, 212, 212)"
    };

    const boxGap = {
      width: "70%",
      marginRight:"10%"
    };
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return (

      <div style={{ width: '100%' }}>
      <Box display="flex" flexDirection="row" p={5} m={5} bgcolor="background.paper">
  <Box style= 
    {boxGap}>
    <Grid container spacing={1} >
      <Grid item xs={12}>
        <div className={classes.paper}>
          <p style={ stylewithbord}>{data.user.username}</p>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div className={classes.paper}> 
      
          username <br/>
          {data.user.username}
        
        </div>
      </Grid>
      <Grid item xs={4}>
        <div className={classes.paper}> 
       
          ID <br/>  {data.user.id}
       
        </div>
      </Grid>
      <Grid item xs={4}>
        <div className={classes.paper}> Website  <br/> {data.user.website} </div>
      </Grid>
      <Grid item xs={4}>
        <div className={classes.paper}> Phone <br/> {data.user.phone} </div>
      </Grid>
      <Grid item xs={4}>
        <div className={classes.paper}> Phone <br/> {data.user.phone} </div>
      </Grid>
      <Grid item xs={4}>
        <div className={classes.paper}> Email <br/> {data.user.email}</div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.paper}> <p style={ stylewithbordTop}>Address </p>  </div>
      </Grid>
      <Grid item xs={3}>
        <div className={classes.paper}>Street <br/>  {data.user.address.street} </div>
      </Grid>
      <Grid item xs={3}>
        <div className={classes.paper}> Suite <br/>   {data.user.address.suite}</div>
      </Grid>
      <Grid item xs={3}>
        <div className={classes.paper}> City <br/>   {data.user.address.city}</div>
      </Grid>
      <Grid item xs={3}>
        <div className={classes.paper}> Zip Code <br/>  {data.user.address.zipcode} </div>
      </Grid>
    </Grid>
    </Box>
    <Box>
    <Grid container spacing={2}>
      <CheckboxListSecondary  id = {id} />
    </Grid>
    </Box>
    </Box>
    </div>
 
     
    );

}  


export default User;
