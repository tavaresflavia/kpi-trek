import './Comment.scss'

const Comment = ({name, content, timeStamp}) => {
    return (
        <div className="comment">
      
          <h4 className = "comment__name">{name}  <span className = "comment__time">|  {timeStamp}</span>  </h4>
          <p className = "comment__text"> {content} </p>
        </div>
    );
};

export default Comment;