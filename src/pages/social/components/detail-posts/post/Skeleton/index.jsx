import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './styles.scss'

const PostSkeleton = () => {
  return (
    <div>
      <div className="post-header">
        <div className="left-col">
          <div className="avatar">
            <Skeleton
              circle
              height="100%"
              containerClassName="avatar-skeleton"
            />
          </div>
        </div>
        <div className="right-col">
          <Skeleton height={40} />
        </div>
      </div>
      <div className="post-body">
        <p>
          <Skeleton count={2} />
        </p>
        <Skeleton height={200} />
      </div>
    </div>
  );
}

export default PostSkeleton;