import React,{Component} from 'react';
export default class Commment extends Component{
    constructor(){
        super();
        this.populateDelete = this.populateDelete.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    populateDelete(){
        if(this.props.comment.user_name === this.props.current_user){
            return <li className="complain" onClick={this.onDeleteClick}><span>Delete </span></li>
        }
    }
    onDeleteClick(){
        this.props.delete_comment_handler(this.props.comment.comment_id);
    }
    
    render(){
        return(
            <div className="comment-wrap">
				<div className='avatar' >
						<img width="100%" src={this.props.comment.user_thumb}/>
				</div>
				<div className="comment-block">
						<p className="comment-text">{this.props.comment.comment_text}</p>
						<div className="bottom-comment">
								<div className="comment-date">{this.props.comment.posted_on}</div>
								<ul className="comment-actions">
                                    {this.populateDelete()}
									<li className="complain"> Complain</li>
									<li className="reply"> Reply</li>
								</ul>
						</div>
				</div>
		    </div>

        );
    }
}


