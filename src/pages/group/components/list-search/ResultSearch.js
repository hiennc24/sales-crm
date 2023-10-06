import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
// import DetailsPost from './DetailsPost';
import DetailPost from '../../../social/components/detail-posts/post/DetailPost';
const uploadUrl = "https://filemanager.crmdemo.net//uploads/";

const ResultSearch = ({ dataResult }) => {
  
  return (
     <div>
     {dataResult.map((post, index) => (
       <DetailPost key={index} post={post} index={index} isGroupPage={false} />
     ))
     }
   </div >
  );
};

ResultSearch.propTypes = {
  dataResult: PropTypes.array
};

export default ResultSearch;
