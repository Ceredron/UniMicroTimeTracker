import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/ContactPersons.js';


class ContactPersons extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getContactPersons();
    }

    componentWillReceiveProps(props) {
        if (props.refresh)
            props.getContactPersons();
    }

    chooseContactPerson(id) {
        alert(id);
    }

    render() {
        return (
            <div>
                <div class="tab">
                    {this.props.contactPersons.map((contactPerson, index) =>
                        <button class="tablinks" key={index} onClick={() => this.props.getDetailedContactPerson(contactPerson.ID)}>contactPerson.ID</button>)
                    }
                </div>
                <div class="tabcontent">
                    {this.props.detailedContactPerson.Info != undefined?<table className='table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Company</th>
                                <th>First Company Address</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr>
                                    <td>{this.props.detailedContactPerson.Info.Name}</td>
                                    <td>{this.props.detailedContactPerson.Role}</td>
                                    <td>{this.props.detailedContactPerson.ParentBusinessRelation.Name}</td>
                                    <td>{this.props.detailedContactPerson.ParentBusinessRelation.Addresses[0] != undefined ? this.props.detailedContactPerson.ParentBusinessRelation.Addresses[0].AddressLine1:''}</td>
                                </tr>
                        </tbody>
                    </table>:''
                    }
                </div>
            </div>
        );
    }

}

export default connect(
    state => state.contactPersons,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ContactPersons);
