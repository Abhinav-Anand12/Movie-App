import React, { Component } from 'react';
import HandlePoster from './HandlePoster'

class Poster extends Component {
  
    constructor(props) {
        super(props)
        this.state = {
            title: props.title,
            year: props.year,
            isLoaded: false,
            onSearch:props.onSearch
        };
    
    }

    handleSubmit=(event) => {
            this.setState({isLoaded: true})
            event.preventDefault();
            if(this.state.onSearch){
                window.location.reload(false)
            }
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
                <HandlePoster title={title} year={year}/>
                </div>);
        }
    }
}
 
export default Poster;