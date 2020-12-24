import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import { useQuery, gql, useMutation } from '@apollo/client';
import IconButton from '@material-ui/core/IconButton';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FilledInput from '@material-ui/core/FilledInput';
import TextField from '@material-ui/core/TextField';


const boxGap = {
  flex: "0 0 auto",
  color: "rgba(0, 0, 0)",
  margin: "0px -17px 0px -34px",
  padding: "12px 0px 12px 0px",
  overflow: "visible",
  fontSize: "1.5rem",
  textAlign: "center",
  transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  borderRadius: "50"
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const query_todos = gql`
query USER($id: ID!){
  user(id: $id) {
    id
      address {
        street
      }
    todos {
      data {
        title
      }
    }
  }
}  
`;

const mutationAddToDo = gql`
mutation createTodo($title: String!, $completed: Boolean!) {
  createTodo(title: $title, completed: $completed) {
    title
  }
}
`;



export default function CheckboxListSecondary(props) {
  const id =props.id;
  console.log(props.id);
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);
  const [message, setMessage] = useState( '' );
  const [title, setTitle] = useState( '' );
  const [completed, setComplete] = useState( false );

  const [createTodo, {error}] = useMutation(mutationAddToDo, {
    variables: {title, completed}, refetchQueries: [{query: query_todos,
      variables: { repoFullName: 'apollographql/apollo-client' },
    }]
  })
 
  const { loading,  data } = useQuery(query_todos, {
    variables: { id },
  });
  console.log(title);
  console.log(error);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // const addToDo = (value) => () => {
  //   const { loading, error, data } = useQuery(ADD_TODO, {
  //     variables: { message },
  //   });
  // };

  return (
  //   <div>
    
  //     <form  noValidate autoComplete="off">
  //     <TextField
  //        type="text"
  //        value={message}
  //        placeholder="Add toDo"
  //        onChange={e => setMessage(e.target.value)}/>
  //     <IconButton style= 
  //   {boxGap} color="primary" aria-label="todoplus" component="span">
  //             <ControlPointIcon 
  //                onClick={
  //                 addToDo(message)
  //                }
  //               />
  //           </IconButton>
  //   </form>
  // </div>
    <List dense className={classes.root}>
    <ListItem key={1} button>
    
     
      <form  noValidate autoComplete="off">
      <TextField
         type="text"
         value={title}
         placeholder="Add toDo"
         onChange={e => setTitle(e.target.value)}/>
      <IconButton style= 
    {boxGap} color="primary" aria-label="todoplus" component="span">
              <ControlPointIcon 
                 onClick={
                  createTodo
                 }
                />
            </IconButton>
    </form>
  
      </ListItem>
      {   data.user.todos.data.map((item, index) => {
        const labelId = `checkbox-list-secondary-label-${item.id}`;
        return (
          
          <ListItem key={item.id} button>
           
            <ListItemText id={labelId} primary={item.title} />
            <ListItemSecondaryAction>
            <IconButton style= 
    {boxGap} color="primary" aria-label="todoplus" component="span">
              <HighlightOffIcon 
                //  onClick={
                 
                //  }
                />
            </IconButton>
            <IconButton style= 
    {boxGap} color="primary" aria-label="todoplus" component="span">
              <CheckCircleOutlineIcon 
                //  onClick={
                 
                //  }
                />
            </IconButton>
            
              {/* <ControlPointIcon
                edge="end"
                // onChange={handleToggle(value)}
                // checked={checked.indexOf(value) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              /> */}
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
    // </div>
  );
}