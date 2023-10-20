import React from 'react'
import Auth from '../../utils/auth'
import { useApolloClient, useMutation } from '@apollo/client';
import { REMOVE_COMMENT } from '../../utils/mutations';

const SingleComment = ({ comment, thoughtId }) => {
    const client = useApolloClient()

    const [removeComment] = useMutation(REMOVE_COMMENT);

    const handleDeleteThought = async (commentId) => {
      const token = Auth.loggedIn() ? Auth.getToken() : null;
      if (!token) {
        return false;
      }
      try {
        await removeComment({ variables: { thoughtId, commentId } });
        await client.refetchQueries({
          include: 'all'
        })
      } catch (error) {
        console.log(error);
      }
    };
    return (
        <>

            <div key={comment._id} className="col-12 mb-3 pb-3">
                <div className="p-3 bg-dark text-light">
                    <h5 className="card-header">
                        {comment.commentAuthor} commented{' '}
                        <span style={{ fontSize: '0.825rem' }}>
                            on {comment.createdAt}
                        </span>
                    </h5>

                    <p className="card-body">{comment.commentText}</p>
                </div>
                {Auth.getProfile().data.username === comment.commentAuthor ? (<button className="btn btn-outline-danger" onClick={() => handleDeleteThought(comment._id)}>
                    Delete
                </button>) : ""}
            </div>

        </>
    )
}

export default SingleComment