import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

    static defaultProps = {
        pageSize: 5,
        country: 'in',
        category: 'general'
    }
    static propTypes = {
        pageSize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string
    }

    capitlizeText = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    constructor(props){
        super(props);
        this.state = {
            articles : [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitlizeText(this.props.category)} - News Feed`
    }
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey} &pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        this.props.progress(20);
        let data = await fetch(url);
        this.props.progress(30);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.progress(100);
    }
    // handlePrevClick = async () =>{
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey} &pageSize=${this.props.pageSize}&page=${this.state.page - 1}`;
    //     this.setState({loading:true});
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     console.log(parsedData);
    //     this.setState({
    //         page: this.state.page - 1,
    //         articles: parsedData.articles,
    //         totalResults: parsedData.totalResults,
    //         loading: false
    //     });
    // }
    // handleNextClick = async() =>{
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey} &pageSize=${this.props.pageSize}&page=${this.state.page + 1}`;
    //     this.setState({loading:true});
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     console.log(parsedData);
    //     this.setState({
    //         page: this.state.page + 1,
    //         articles: parsedData.articles,
    //         totalResults: parsedData.totalResults,
    //         loading: false
    //     });
    // }
    fetchMoreDataonScroll = async() =>{
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey} &pageSize=${this.props.pageSize}&page=${this.state.page+1}`;
        this.setState({page: this.state.page + 1})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        });
    }
    render() {
        return (
            <>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&raquo;</button>
                </div> */}
                <h1 className='text-center' style={{margin: '30px', marginTop: '80px'}}> News Feed - Top {this.capitlizeText(this.props.category)} Headlines</h1>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreDataonScroll}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                    >
                <div className="container">
                    <div className="row my-3">
                        {this.state.articles.map((element)=>{
                            return <div key={element.url} className="col-md-4">
                                <NewsItem title={element.title} description={element.description} 
                                imageUrl={element.urlToImage} newsUrl={element.url} author={element.author}
                                publishedAt={element.publishedAt} source={element.source}/>
                            </div>
                        })}
                    </div>
                </div>
                </InfiniteScroll>
            </>
        )
  }
}
