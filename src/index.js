
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
//import Routes from './Routes';

const httpLink = createHttpLink({
  uri: 'https://graphqlzero.almansi.me/api'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

// const ApolloApp = () => (
//   <ApolloProvider client={client}>
//  <App />

//   </ApolloProvider>
// )

ReactDOM.render(
  <ApolloProvider client={client}>
     <Router> 
        <App />
    </Router>,
  </ApolloProvider>,
  document.getElementById('root'),
);


//ReactDOM.render(<ApolloApp />, document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
//serviceWorker.unregister();
