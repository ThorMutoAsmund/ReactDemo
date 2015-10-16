
var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author={comment.Author}>
                  {comment.Text}
                </Comment>
            );
        });
        
        return (
          <div className="commentList">
            {commentNodes}
          </div>
        );
    }
});

var CommentForm = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault();
        var author = this.refs.author.getDOMNode().value.trim();
        var text = this.refs.text.getDOMNode().value.trim();
        if (!text || !author) {
            return;
        }

        this.props.onCommentSubmit({ Author: author, Text: text });
        this.refs.author.getDOMNode().value = '';
        this.refs.text.getDOMNode().value = '';
        return;
    },
    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input id="author" className="form-control" type="text" placeholder="Your name" ref="author" />
                </div>
                <div className="form-group">
                    <label htmlFor="text">Text</label>
                    <input id="text" className="form-control" type="text" placeholder="Say something..." ref="text" />
                </div>
                <input type="submit" className="btn btn-default" value="Post" />
            </form>
        );
    }
});

var CommentBox = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    loadCommentsFromServer: function () {
        $.getJSON(this.props.url, function (data) {
            this.setState({ data: data });
        }.bind(this));
    },
    handleCommentSubmit: function (comment) {
        var comments = this.state.data;
        var newComments = comments.concat([comment]);
        this.setState({ data: newComments });

        // TODO: submit to the server and refresh the list
        $.post(this.props.submitUrl, comment, function (result) {
            console.log(result);
        }, "text").fail(function (error) {
            console.log(error);
            alert("Failure: " + error.statusText);
        });
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        window.setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function() {

        return (
          <div className="row">
              <div className="col-md-12 commentBox">
                 <h1>Comments</h1>
                 <CommentList data={this.state.data} />
                 <h1>Comment form</h1>
                 <CommentForm onCommentSubmit={this.handleCommentSubmit} />
              </div>
          </div>
        );
    }
});

var Comment = React.createClass({
    render: function() {
        return (
          <div className="comment">
            <h2 className="commentAuthor">
              {this.props.author}
            </h2>
            {this.props.children}
        </div>
      );
    }
});
