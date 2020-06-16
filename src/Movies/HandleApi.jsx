import React, { Component } from 'react';
import {Modal} from 'antd';

class HandleApi extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: props.title,
            year: props.year,
            movies: [],
            curMovieId:null,
            moviesList: {},
            visible: false,
            boxOffice: ''
        };
    }
  
    showModal = (event) => {  
        this.setState({
            visible: false,
            curMovieId: event.target.id
          });
          setTimeout(() => {
            alert("Loading....");
        }, 0);

          setTimeout(() => {
            const uri ="http://www.omdbapi.com/?apikey=e1075083";
            fetch(`${uri}&i=${this.state.curMovieId}&plot=full`).then(myres => myres.json())
            .then(mymovie => {this.setState({
                moviesList: mymovie,
            })
            parseInt(this.state.moviesList.imdbRating) > 7 ?  this.setState({
                boxOffice: "hit"}) :  this.setState({ boxOffice: "flop"})
            })
                this.setState({
                    visible: true,
                })
        }, 6000); 
  };

    handleOk = e => {
        console.log(e);
        this.setState({
        visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
        visible: false,
        });
    }; 
    componentDidMount(){
        const uri ="http://www.omdbapi.com/?apikey=e1075083";
        const url=`${uri}&s=${this.state.title}&y=${this.state.year}`; 
        fetch(url).then(res => res.json())
        .then(movie => {this.setState({
            movies: Object.values(movie.Search) 
        })})         
    }
    
    render() { 
        return(
        <div>
        { 
            this.state.movies.map((movie) => (
                <div style={this.style} id={movie.imdbID}>
                <ul>
                <img src={movie.Poster} width={300} height={100} mode='fit'alt="new"/>
                    <span >{movie.Title} </span><br/>
                    <span> Year {movie.Year}  </span>
                    <span>Imdb Id: {movie.imdbID}  </span>
                    <span>Type: {movie.Type}  </span>  
                    <button id={movie.imdbID} type="button" onClick={this.showModal}>More Info</button>                      
                </ul>                       
                </div>      
            ))    
        }
        <Modal
          title="About"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
              <ul>
                    <span style={{backgroundColor: "DodgerBlue"}}>Box Office: {this.state.boxOffice}  </span>
                  { Object.keys(this.state.moviesList).map((item)=> item !=="Ratings"? (<span>{this.state.moviesList[item]}</span>): null)}
              </ul>
        </Modal> 
      </div>
    );
  }

}

 
export default HandleApi;