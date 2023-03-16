import React, { Component } from 'react';
import { getUsers } from '../api/apiCalls';
import { withTranslation } from 'react-i18next';
import UserListItem from './UserListItem';
class UserList extends Component {

    state = {
        page: {
            content: [],
            number: 0,
            size: 3
        }
    }

    componentDidMount() {
        this.loadUsers();

    };

    onClickNext = () => {
        const nextPage = this.state.page.number + 1;
        this.loadUsers(nextPage);
    }

    onClickPrevious = () => {
        const nextPage = this.state.page.number - 1;
        this.loadUsers(nextPage);
    }

    loadUsers = page => {
        getUsers(page).then(response => {
            this.setState({
                page: response.data
            });
        });
    }

    render() {
        const { content: users, last, first } = this.state.page;
        const { t } = this.props;
        return (

            <div className='card'>
                <h3 className='card-header text-center'>{t('Users')}</h3>
                <div className='list-group'>
                    {
                        users.map(user => (
                            <UserListItem key={user.username} user={user} />
                        ))
                    }
                </div>
                <div>
                    {first === false && (<button className='btn btn-sm btn-light' onClick={this.onClickPrevious}>{t('Back')}</button>)}

                    {last === false && (<button className='btn btn-sm btn-light float-right' onClick={this.onClickNext}>{t('Next')}</button>)}
                </div>
            </div>
        );
    };
}
const UserListWithTranslation = withTranslation()(UserList);

export default UserListWithTranslation;