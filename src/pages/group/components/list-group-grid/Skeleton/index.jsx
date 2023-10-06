import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './styles.scss'

const GroupSkeleton = () => {
  return (
      <div className="group">
        <Skeleton height='100%' />
      </div>
  );
}

export default GroupSkeleton;