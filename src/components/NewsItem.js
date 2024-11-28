import React, { Component } from "react";

export class NewsItem extends Component {
    // constructor(){
    //     super();
    //     console.log("hello i am constructor")
    // }
    render() {
        let { title, description, imageUrl, newsUrl } = this.props;
        return (
            <div className="my-3">
                <div className="card" style={{ width: "18rem" }}>
                    <img
                        src={!imageUrl?"https://www.tagesspiegel.de/images/12724319/alternates/BASE_16_9_W1400/1731923700000/protest-camp-bei-tesla.jpeg":imageUrl}
                        className="card-img-top"
                        alt="..."
                    />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsItem;
