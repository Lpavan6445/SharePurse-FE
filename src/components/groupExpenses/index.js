import React from 'react'
import { Route, useParams, Switch } from 'react-router-dom';
import AppUrls from '../../Base/route/appUrls';
import GroupsList from './components/groupsList';
import ViewGroup from './components/viewGroup';
import AddExpenses from './components/addExpenses';
import ViewExpenses from './components/viewExpenses';
import EditExpenses from './components/editExpenses';
import GroupContextBase from './groupContext';

const GroupExpenses = props => {
  return (
    <GroupContextBase.Wrapper {...props}>
        <ViewGroup {...props} />
    </GroupContextBase.Wrapper>
  )
}

export default GroupExpenses;