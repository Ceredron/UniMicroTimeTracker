// POST https://test.unieconomy.no/api/biz/workitems

// GET https://test.unieconomy.no/api/biz/workitems?expand=WorkType,Dimensions,Dimensions.Project,Dimensions.Department,CustomerOrder,Customer,Customer.Info&filter=WorkRelationID eq 1 and ( date eq '2019-05-05' )&orderBy=StartTime&hateoas=false
// For timer

// GET https://test.unieconomy.no/api/biz/worktypes?select=id,name&hateoas=false For arbeidstyper

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/TimeTracker.js';


class TimeTracker extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
        this.props.getWorkItemList();
    }

    componentWillReceiveProps(props) {
        if (props.addNew) {
            const description = window.prompt("Describe work item", "It is nice");
            props.postNewWorkItem(description);
        }
        if (props.needUpdate) {
            props.getWorkItemList();
        }
    }

    render() {
        return (
            <div>
                <h1>Time tracker</h1>

                <div>
                </div>
                <div>
                    {this.props.currentlyTracking ? <button onClick={this.props.stopTimer}>Stop</button> : <button onClick={this.props.startTimer}>Start</button>}
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Minutes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.workItems.map(workItem =>
                                <tr>
                                    <td>{workItem.Description}</td>
                                    <td>{workItem.StartTime}</td>
                                    <td>{workItem.EndTime}</td>
                                    <td>{workItem.Minutes}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

export default connect(
    state => state.timeTracker,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(TimeTracker);
