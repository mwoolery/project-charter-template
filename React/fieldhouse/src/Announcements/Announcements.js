import React, { Component } from 'react';

class Announcements extends Component {
    // Adds a class constructor that assigns the initial state values:
    constructor () {
        super();
        this.state = {
            announcementTitle: '',
            announcementText: '',
            announcementDate: ''
        };
    }
    // This is called when an instance of a component is being created and inserted into the DOM.
    componentWillMount () {
        this.setState({ announcementTitle: "Grand Opening" });
        this.setState({ announcementText: "Come to the Hughes FieldHouse Ribbon Cutting Ceremony Located at the FieldHouse on the field" });
        this.setState({ announcementDate: "October 10th, 2018" });
    }
    // The render method contains the JSX code which will be compiled to HTML.
    render() {
        return (
            <div className="announcements--section container">
                    <h2>{this.state.announcementTitle}</h2>
                    <div className="columns announcements--section__box">
                        <div className="column btc--section">
                            <h5>{this.state.announcementDate}</h5>
                            <p>{this.state.announcementText}</p>
                        </div>
                       
                    </div>
                </div>
        )
    }
}

export default Announcements;