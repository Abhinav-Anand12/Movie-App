import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

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
            currentPage: 0,
        };
    }

    style ={
        color: "black",
        bold:true,
        backgroundColor: "DodgerBlue"
    }

    setElementsForCurrentPage() {
        let elements = this.state.movies
                      .slice(this.state.offset, this.state.offset + this.state.perPage)
                      .map(post =>
          ( <img src="{post.thumburl}" alt="new"/>)
        );
        this.setState({ elements: elements });
      }

    handlePageClick = (data) => {
        const selectedPage = data.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({ currentPage: selectedPage, offset: offset }, () => {
          this.setElementsForCurrentPage();
        });
      }

    componentDidMount(){
        const uri ="http://www.omdbapi.com/?apikey=e1075083";
        const url=`${uri}&s=${this.state.title}&y=${this.state.year}`; 
        fetch(url).then(res => res.json())
        .then(movie => {this.setState({
            movies: Object.values(movie.Search),
            pageCount: Math.ceil(this.state.movies.length / this.state.perPage)
          }, () => this.setElementsForCurrentPage())     
          console.log(this.state.movies.length);
           })         
    }
    
    render() { 
        let paginationElement;
        if (this.state.pageCount > 1) {
          paginationElement = (
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              breakLabel={<span className="gap">...</span>}
              pageCount={this.state.pageCount}
              onPageChange={this.handlePageClick}
              forcePage={this.state.currentPage}
              containerClassName={"pagination"}
              previousLinkClassName={"previous_page"}
              nextLinkClassName={"next_page"}
              disabledClassName={"disabled"}
              activeClassName={"active"}
            />
          );
          }
            return ( <div>
                {paginationElement}
                { 
                    this.state.movies.map((movie) => (
                    <div style={this.style} id={movie.imdbID}>
                    <ul>
                    <img src={movie.Poster} width={300} height={100} mode='fit'alt="new"/>
                        <span >{movie.Title} </span><br/>
                        <span> Year {movie.Year}  </span>
                        <span>Imdb Id: {movie.imdbID}  </span>
                        <span>Type: {movie.Type}  </span>                        
                    </ul>                       
                    </div>       
                    ))         
                }
                {paginationElement}
                    </div> );
            }
}

export default HandlePoster;