import React from 'react';
import UserSearch from './component/UserSearch'
import UserList from './component/UserList'

export default class CenterIndex extends React.Component {

    render() {

        return (
            <div style={{ marginTop: 10 , borderColor: '#52c41a'}}>
                <UserSearch />
                <UserList />
            </div>
        );
    }
}
