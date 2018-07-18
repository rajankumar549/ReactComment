import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import Comment from './Comment'
const currentUser={
	userName:'rajankumar549',
	apiToken:'hgc5455KJhVdf45sdgddgklj'
}
class App extends Component {
	constructor(){
		super();
		this.state={
			comments:false,
		};
		this.getComments = this.getComments.bind(this);
		this.populateComments = this.populateComments.bind(this);
		this.postComment= this.postComment.bind(this);
		this.deleteComment = this.deleteComment.bind(this);
	}
	deleteComment(use_comment_id){
		var allComments=this.state.comments.filter((ele)=>{
			return use_comment_id != ele.comment_id;
		})
		localStorage.user_comment=JSON.stringify(allComments);
		this.setState({comments:allComments});
	}
	notification(msg){
		$(".notification").html(msg).show();
		setTimeout(()=>{$(".notification").fadeOut(500);},1000);
	}
	postComment(){
		var commentText=$("#comment-input").val();
		if(!commentText){
			this.notification("Please Enter Comment!!!");
				return;
		}
		var x=currentUser;
		var userName = currentUser.userName;
		var apiToken= currentUser.apiToken;
		//illusion of server request
		var allComments= localStorage.user_comment || [];
		if(allComments){
			allComments = JSON.parse(allComments);
			allComments.push({comment_text:commentText,
				comment_id:Date.now()*parseInt(Math.random()*10),
				user_name:userName,
				posted_on:function(){var d=new Date(); return d.toString()}(),
				user_thumb : "https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg"
			});
			var commentText=$("#comment-input").val('');
			localStorage.user_comment=JSON.stringify(allComments);
			this.notification("Comment Posted Sucessfully!!!");
			this.setState({comments:allComments});

		}
	}
	populateComments(){
		if(this.state.comments){
			return this.state.comments.map((ele,index)=>{
				return <Comment key={index} comment={ele} current_user={currentUser.userName} delete_comment_handler={this.deleteComment}/>
			});
		}
	}
	getComments(){
		var items=false;
		var userComments=localStorage.user_comment;
		if(!userComments){
			$.getJSON( "comment.json", ( data )=> {
				localStorage.user_comment=JSON.stringify(data);
				this.setState({comments:data});
			});
		}
		else{
			userComments=JSON.parse(localStorage.user_comment)
			this.setState({comments:userComments});
		}
	}
	componentDidMount(){
		$(".notification").hide();
		this.getComments();
	}
  render() {
    return (
      <div className="comments">
      	<div className="comment-wrap">
			<div className='avatar' >
				<img width="100%" src='https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg'/>
			</div>
			<div className="comment-block">
				<form action="">
					<textarea name="comment-input" id="comment-input" cols="30" rows="5" placeholder="Add comment..."></textarea>
				</form>
				<button type="button" className="btn btn-success" onClick={this.postComment}>Post</button>
			</div>
		</div>
		   {this.populateComments()}
		   <div className="notification">Please Enter Valid Details</div>
      </div>);
  }
}

export default App;
