import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import UnimicroLogin from './components/UnimicroLogin';
import TimeTracker from './components/TimeTracker';
import ContactPersons from './components/ContactPersons';

export default () => (
  <Layout>
    <Route exact path='/' component={UnimicroLogin} />
    <Route path='/login' component={UnimicroLogin} />
    <Route path='/timetracker' component={TimeTracker} />
    <Route path='/contactpersons' component={ContactPersons} />  
  </Layout>
);
