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
            visible: false,
            moviesList: {},
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
        .then(movie => {
            console.log("movie" + movie + "movie.Search" + movie.Search)         
            typeof(movie.Search) !== 'undefined'?  
            this.setState({
             movies: Object.values(movie.Search) 
        }) :
        this.setState({movies: null})
    })         
    }
    
    render() { 

        const {movies,moviesList,boxOffice,visible} = this.state
        if(movies === null){
            return(<h3>No movies found</h3>);
        }
        else
        {
            return( 
                <div>
                { 
                    movies.map((movie) => (
                        <div style={this.style} id={movie.imdbID}>
                        <ul>
                        <img src={movie.Poster} width={128} alt="new"/>
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
                  visible={visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}>
                      <ul>
                            <span style={{backgroundColor: "DodgerBlue"}}>Box Office: {boxOffice}  </span>
                          { Object.keys(moviesList).map((item)=> item !=="Ratings"? (<span>{moviesList[item]}</span>): null)}
                      </ul>
                </Modal> 
              </div>
            );
        }
  }

}

 
export default HandleApi;