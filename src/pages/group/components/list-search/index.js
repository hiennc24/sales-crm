import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import LayoutMain from '../../../../components/LayoutMain';
import ResultSearch from "./ResultSearch";
import LeftSelect from "./LeftSelect";
import { Row, Col, Grid } from "antd";
import { Scrollbars } from "react-custom-scrollbars";
import apis from '../../../../services/api';
import './list-search.scss'

const size = 5;
const SearchPage = ({ location, match }) => {

    const [listPostSearch, setListPostSearch] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [isLoading, setLoading] = useState(false);
    const [isLoadMore, setLoadMore] = useState(true);
    const [keySearch, setKeySearch] = useState(location?.search ? location?.search.substring(3, location.search.length) : "")

    let groupId = match?.params?.id || null

    useEffect(() => {
        setPageIndex(1)
        getListResultSearch(1, [])
        window.scrollTo(0, 0);
    }, [keySearch])

    useEffect(() => {
        window.addEventListener("scroll", handle_scroll)
        return () => window.removeEventListener("scroll", handle_scroll);
    }, [isLoading, listPostSearch.length])


    const handle_scroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight
        const body = document.body
        const html = document.documentElement
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
        const windowBottom = windowHeight + window.pageYOffset
        if (windowBottom >= docHeight) {
            if (!isLoading && isLoadMore) {
                getListResultSearch(pageIndex, listPostSearch)
            }
        }

    }

    function getListResultSearch(page, list) {
        setLoading(true)
        let params = {
            groupId,
            keySearch
        }

        console.log('EEEE',params, page, size)

        apis.posts.getListGroupSearch(params, page, size).then(res => {
            if (res?.code === 200) {
                if (res.data.length < size) {
                    setLoadMore(false)
                } else {
                    setPageIndex(page + 1)
                }
                setListPostSearch(list.concat(res.data))
                // if (!res.data.length) {
                //     alert("Chúng tôi không tìm thấy kết quả nào! \n\Đảm bảo tất cả các từ đều đúng chính tả hoặc thử từ khóa khác.")
                // }
            }
            else {
                alert(`Code: ${res?.code}: ${res?.message}`)
            }
            setLoading(false);
        })
    }

    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();

    return (
        <LayoutMain>
            <div className="group-search">
                <div className="group__search--left">
                    <Scrollbars autoHide autoHeightMin={0} autoHeightMax={"inherit"}>
                        <LeftSelect keySearch={keySearch} setKeySearch={setKeySearch} />
                    </Scrollbars>
                </div>
                <div className={screens.xl ? "group__search--main" : 'group__search--main--full'}>
                    <ResultSearch dataResult={listPostSearch} />
                </div>
            </div>
        </LayoutMain>
    );
}

SearchPage.propTypes = {
    location: PropTypes.location,
    match: PropTypes.location,
};

export default SearchPage;