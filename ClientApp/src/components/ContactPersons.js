import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/ContactPersons.js';


class ContactPersons extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.submitChanges = this.submitChanges.bind(this);
        this.deleteContactPerson = this.deleteContactPerson.bind(this);
    }

    componentWillMount() {
        this.props.getContactPersons();
        this.setState({ ID: -1, newContactPerson: false });
    }

    componentWillReceiveProps(props) {
        if (props.refresh)
            props.getContactPersons();

        if (this.state.newContactPerson === false && props.detailedContactPerson.ID != undefined)
            this.setState({
                ID: props.detailedContactPerson.ID,
                name: props.detailedContactPerson.Info != null?props.detailedContactPerson.Info.Name:'',
                role: props.detailedContactPerson.Role, 
                companyName: props.detailedContactPerson.ParentBusinessRelation != null ? props.detailedContactPerson.ParentBusinessRelation.Name :'',
                companyAddress: props.detailedContactPerson.ParentBusinessRelation != null ?
                    props.detailedContactPerson.ParentBusinessRelation.Addresses[0] != undefined ? props.detailedContactPerson.ParentBusinessRelation.Addresses[0].AddressLine1 : ''
                    :''
            });
    }

    chooseContactPerson(id) {
        this.setState({ newContactPerson: false })
        this.props.getDetailedContactPerson(id);
    }

    newContactPerson(){
        this.setState({
            newContactPerson: true,
            contactPersonID: '',
            name: '',
            role: '',
            companyName: '',
            companyAddress: '',
            ID: 0,
            Info: {}
        });

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    submitChanges() {

        const contactPerson = {
            ID: this.state.ID,
            Role: this.state.role,
            Info: {
                Name: this.state.name
            },
            ParentBusinessRelation: {
                Name: this.state.companyName,
                Addresses: [{ AddressLine1: this.state.companyAddress }]
            },
        }

        if (this.state.newContactPerson) {
            delete contactPerson.ID;
            this.props.createNewContactPerson(contactPerson);
        }
        else
            this.props.updateContactPerson(contactPerson)
    }

    deleteContactPerson() {
        this.props.deleteContactPerson(this.state.ID);
    }

    render() {
        return (
            <div>
               <div class="tab">
                    {this.props.contactPersons.map((contactPerson, index) =>
                        <button class="tablinks" key={index} onClick={() => this.chooseContactPerson(contactPerson.ID)}>{contactPerson.ID}</button>)
                    }
                    {this.props.initialized?<button class="tablinks" onClick={() => this.newContactPerson()}>New</button>:<h1>Need to be logged in</h1>}
                </div>
                <div class="tabcontent">
                    {this.state.ID >= 0?<table className='table'>
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
                                <td><input type="text"
                                        name='name'
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                    /></td>

                                <td><input type="text"
                                        name='role'
                                        value={this.state.role}
                                        onChange={this.handleChange}
                                    /></td>

                                <td><input type="text"
                                        name='companyName'
                                        value={this.state.companyName}
                                        onChange={this.handleChange}
                                    /></td>

                                <td><input type="text"
                                        name='companyAddress'
                                        value={this.state.companyAddress}
                                        onChange={this.handleChange}
                                    /></td>
                                    <td>
                                        <button onClick={this.submitChanges}>Save Changes</button>
                                    </td>
                                    <td>
                                        <button onClick={this.deleteContactPerson}>Delete</button>    
                                    </td>
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
