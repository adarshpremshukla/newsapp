import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults:0,
        };
    }
    // it will run after rendor method
    async componentDidMount() {
        let url =
            `https://newsapi.org/v2/everything?q=apple&from=2024-11-24&to=2024-11-24&sortBy=popularity&apiKey=11fee6ff9f894a08a7cfa525f8ee65c7&page=1&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, 
            loading:false,
            totalResults: parsedData.totalResults });
    }

    handlePreviousClick = async () => {
        console.log('previous')
        let url =
            `https://newsapi.org/v2/everything?q=apple&from=2024-11-24&to=2024-11-24&sortBy=popularity&apiKey=11fee6ff9f894a08a7cfa525f8ee65c7&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading:false
        })
    };
    handleNextClick = async () => {
        console.log("next");
        if (! this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

        }
        else {
            let url =
                `https://newsapi.org/v2/everything?q=apple&from=2024-11-24&to=2024-11-24&sortBy=popularity&apiKey=11fee6ff9f894a08a7cfa525f8ee65c7&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
                this.setState({loading:true});
                let data = await fetch(url);
            let parsedData = await data.json();
            // console.log(parsedData);
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading:false
            })
        }

    };
    render() {
        return (
            <div className="container my-3 mb-3">
                <h1 className="text-center">NewsMonkey - Top Headlines</h1>
               {this.state.loading && <Spinner/>}
                <div className="row mt-3">
                {!this.state.loading && this.state.articles.map((element) =>{
                        return (
                            <div className="col-md-3 mb-3" key={element.url}>
                                <NewsItem
                                    title={element.title ? element.title : ""}
                                    description={element.description ? element.description : ""}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                />
                            </div>
                        );
                    })} 
                </div>
                <div className="container d-flex justify-content-between">
                    <button
                        disabled={this.state.page <= 1}
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handlePreviousClick}
                    >
                        {" "}
                        &larr; Previous
                    </button>
                    <button
                    disabled={this.state.page + 1 > Math.ceil(this.state.totalResults /this.props.pageSize)}
                        type="button"
                        className="btn btn-dark "
                        onClick={this.handleNextClick}
                    >
                        {" "}
                        Next &rarr;
                    </button>
                </div>
            </div>
        );
    }
}

export default News;
