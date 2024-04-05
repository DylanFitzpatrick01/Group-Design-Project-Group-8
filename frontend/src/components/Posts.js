// Post.js
import React from 'react';

function Posts({ posts, deletePost, handleAddToCalendarClick }) {
    return (
        <div className="col">
            {
                posts.map(post => (
                    <div key={post.id} className="row border-0 mb-4 post rounded">
                        <div className="col-10 ms-3">
                            <div className="row border-0 text-start">
                                <p className="mt-3 mb-3 postTitle">{post.title} - {new Date(post.date).toLocaleString()}</p>
                            </div>
                            <div className="row border-0 text-start">
                                <pre className="m-0 mb-3">{post.content}</pre>
                                {post.isEvent && (
                                    <div className="row border-0">
                                        <button className='btn btn-primary' id="addToCalendar" onClick={() => handleAddToCalendarClick(post.eventDetails)}>Add to Calendar</button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-1 ms-3 postLnk d-flex flex-column justify-content-center">
                            <div className="row border-0"><a href="#">Like({post.like})</a></div>
                            <div className="row border-0"><a href="#">Comment({post.comment})</a></div>
                            <div className="row border-0"><a href="#">Share({post.share})</a></div>
                            {post.author === localStorage.getItem('society') && <div className="row border-0">
                                <a href="#" onClick={() => deletePost(post.id)}>Delete</a>
                            </div>}

                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Posts;
