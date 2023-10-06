import React, { useEffect, useState } from 'react';
import { Row, Col, Image, Button } from 'antd';
import { selectGroupDetail } from '../../Group.selector';
import { useSelector } from 'react-redux';
import './AlbumGroup.scss';
import apis from '../../../../services/api';
import { getUrlImage } from '../../../../utils';
import BoxLoading from '../../../../components/box-loading/BoxLoading';
import NoData from '../../../../assets/new/common/no-data.svg';
import ImageAlbum from '../../../../assets/images/groups/img-album.png';
import EmptyData from '../../../social/components/detail-posts/post/EmptyData';

const AlbumGroup = () => {
  const pageSize = 12;
  const groupDetail = useSelector(selectGroupDetail());
  const [pageIndex, setPageIndex] = useState(1);
  const [imagesView, setImagesView] = useState([]);
  const [isLoadMore, setLoadMore] = useState(true);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (groupDetail.Id) {
      window.scrollTo(0, 0);
      getImages(1, []);
      setLoadMore(true);
    }
  }, [groupDetail.Id]);

  useEffect(() => {
    window.addEventListener('scroll', handle_scroll);
    return () => window.removeEventListener('scroll', handle_scroll);
  }, [isLoading, imagesView.length]);

  const handle_scroll = () => {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom + 10 >= docHeight) {
      if (isLoading === false && isLoadMore) {
        getImages(pageIndex, imagesView);
      }
    } else {
    }
  };

  const getImages = (page, imagesView) => {
    setLoading(true);
    apis.group.getListImageGroup(groupDetail.Id, page, pageSize).then((res) => {
      if (res?.code === 200) {
        if (res.data.length < pageSize) {
          setLoadMore(false);
        } else {
          setPageIndex(page + 1);
        }
        setImagesView(imagesView.concat(res.data));
      }
      setLoading(false);
    });
  };

  // useEffect(() => {
  //     apis.group.getListImageGroup(groupDetail.Id, page, pageSize).then(res => {
  //         if (res?.code === 200) {
  //             setImagesView(res.data);
  //         }
  //     })
  // }, [groupDetail.Id])

  return (
    <div className='album-group-page'>
      <div className='title-image mb--16'>
        {/* <div> */}
          {/* <div className='text-title'>Ảnh</div> */}
          <span className='text-topic'>Ảnh/Video của bạn</span>
        {/* </div> */}
        {/* <Button className='btn-add-calendar' onClick={() => {}}>
          + Thêm
        </Button> */}
      </div>
      <Row gutter={[12, 8]}>
        {isLoading && (
          <div className='loading'>
            <BoxLoading />
          </div>
        )}
        {imagesView.length > 0
          ? imagesView.map((item, index) => (
              <Col span={8} key={index} className='img-holder'>
                <Image
                  height={200}
                  width={'100%'}
                  src={getUrlImage(0,0,item.Code)}
                />
              </Col>
            ))
          : <Col span={24}>
            <div className='no-task' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 450}}>
              <div style={{ textAlign: 'center' }}>
                <EmptyData type={'mediaGroup'} />
                <br />
                <p style={{ color: '#272727', opacity: 0.6, fontSize: 18,  }}>Chưa có ảnh/video nào</p>
              </div>
              {/* <div style={{ textAlign: 'center' }}>
                <img src={NoData} alt='noTask' />
                <p style={{ color: '#414346' }}>Chưa có hoạt động nào</p>
              </div> */}
            </div>
          </Col> 
          }
      </Row>
    </div>
  );
};

export default AlbumGroup;
