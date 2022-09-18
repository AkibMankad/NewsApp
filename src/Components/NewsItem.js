import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let {title, description, imageUrl, newsUrl, author, publishedAt,source} = this.props;
        return (
            <div className='my-2'>
            <div className="card">
            <div style={{display: 'flex',
            justifyContent: 'space-evenly',
            position: 'absolute',
            right: '0'}}>
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                {source.name}
            </span> 
            </div>
            <img src={imageUrl ? imageUrl : 'https://static.tnn.in/thumb/msid-94117973,imgsize-100,width-1280,height-720,resizemode-75/94117973.jpg'} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description ? description : 'No Description Available...'}</p>
                <p className="card-text"><small className="text-muted">By {author?author:'Unknown'} on {new Date(publishedAt).toUTCString()}</small></p>
                <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-dark">Read More</a>
            </div>
            </div>
        </div>
        )
  }
}
