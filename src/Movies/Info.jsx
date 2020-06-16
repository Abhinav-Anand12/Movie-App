import React, { Component } from 'react';
import HandleApi from './HandleApi';

export default class Info extends Component {
constructor(props) {
    super(props)
    this.state = {
        title: '',
        year: '',
        isLoaded: false,
    };

}
    handleSubmit=(event) => {
        this.setState({isLoaded: true})
        event.preventDefault();
  }

    handleOnChange = event => {       
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        
        const {title,year} = this.state;
        if(!this.state.isLoaded){
            return (
                <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <input type="text" name="title" value={title} onChange={this.handleOnChange} />
                    <label>Year</label>
                    <input type="text" name="year" value={year} onChange={this.handleOnChange} />
                    <input type="Submit" defaultValue="Submit" />
                </form>
                </div>
            );
        }
        else{
            return(
                <div>
                <HandleApi title={title} year={year}/>
                </div>);
        }
    }
}
