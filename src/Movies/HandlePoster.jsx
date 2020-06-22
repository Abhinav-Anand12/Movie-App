import React, { Component } from 'react';
import { Pagination } from "antd"
import Poster from './Poster';

class HandlePoster extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: props.title,
            year: props.year,
            movies: [],
            offset: 0,
            elements: [],
            perPage: 10,
            currentPage: 1,
            allMovies: [],
            maxPageNo:null,
            pageCount:null,
            isLoaded: false,
            page: 1
        };
    }
    style ={
        color: "black",
        bold:true,
    }

    handlePageChange = (page) => {
      this.setState({ page, loading: true },this.fetchMovies);
    }; 

    handleTitleChange = (e) => {
      this.setState({ title: e.target.value });
    };
  
    handleYearChange = (year) => {
      this.setState({ year });
    };


    fetchMovies = async () => {
      const uri ="http://www.omdbapi.com/?apikey=e1075083";
      const url=`${uri}&s=${this.state.title}&y=${this.state.year}&type=movie`; 
      await fetch(url).then(res => res.json()).then(movie => {this.setState({ maxPageNo: Math.ceil(parseInt(movie.totalResults) / this.state.perPage)})})

      const url2=`${uri}&s=${this.state.title}&y=${this.state.year}&page=${this.state.page}&type=movie`; 
      await fetch(url2).then(res => res.json())
      .then(movie => {this.setState({
          movies: movie.Search,
        })})
    };

    componentDidMount(){
      console.log("Component didd mount");
      const uri ="http://www.omdbapi.com/?apikey=e1075083";
      const url=`${uri}&s=${this.state.title}&y=${this.state.year}&type=movie`; 
      fetch(url).then(res => res.json()).then(movie => {this.setState({ maxPageNo: Math.ceil(parseInt(movie.totalResults) / this.state.perPage)})})
    }

    render() { 
      const {movies, title, year , maxPageNo} = this.state

      const search = (
        <Poster title={title} year={year} onSearch={true} />
      );    
            const totalResults = maxPageNo*10;
            const pagination = totalResults ? (
            <Pagination
              defaultCurrent={0}
              total={totalResults}
              onChange={this.handlePageChange}
              showSizeChanger={false}
            />
          ) : ("");

            return ( <div> 
                {search}
                {   
                    movies.map((movie) => (
                    <div style={this.style} id={movie.imdbID}>
                    <ul>
                    <img src={movie.Poster} width={128} alt="new"/>
                        <span >{movie.Title} </span><br/>
                        <span> Year {movie.Year}  </span>
                        <span>Imdb Id: {movie.imdbID}  </span>
                        <span>Type: {movie.Type}  </span>                        
                    </ul>                       
                    </div>       
                    ))         
                }
                {pagination}
                    </div> );
            }
}

export default HandlePoster;