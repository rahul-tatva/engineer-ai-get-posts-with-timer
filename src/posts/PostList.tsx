import React, { useEffect, useState } from "react";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import PostInfo from "./PostInfo";
import http from "../services/httpService";
import { INTERVAL_TIME_IN_SECONDS } from "../utils/constants";
import { Posts,Hit } from "../services/post.service";
import { AxiosResponse } from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([] as Hit[]);
  const [open, setOpen] = React.useState(false);
  const [postData, setPostData] = useState([] as string[]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    if (pageCount === 0) {
      getPost();
    } else {
      var apiCallWithTimer = setInterval(() => {
        getPost();
      }, INTERVAL_TIME_IN_SECONDS);
    }

    function getPost() {
      const apiEndPoint = `/search_by_date?tags=${"story"}&page=${pageCount}`;
      http
        .get(apiEndPoint)
        .then((response: AxiosResponse<Posts>) => {
          setPosts((prevPosts) => [...prevPosts, ...response.data.hits]);
          setPageCount((prevPageCount) => prevPageCount + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return () => clearInterval(apiCallWithTimer);
  }, [pageCount]);

  const columns = [
    { name: "title", label: "Title" },
    { name: "url", label: "URL" },
    { name: "created_at", label: "Created At" },
    { name: "author", label: "Author" },
  ];
  const handleClickOpen = (postDetail: string[]) => {
    setPostData(postDetail);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const options : MUIDataTableOptions = {
    filterType: "checkbox",
    onRowClick: function (rowData: string[]) {
      handleClickOpen( rowData );
      // history.push("/post", { postDetail: rowData });
    },
    rowsPerPageOptions: [5, 10, 15, 20, 100],
    rowsPerPage: 20,
  };

  return (
    <div>
      <MUIDataTable
        title={"Posts List"}
        data={posts}
        columns={columns}
        options={options}
      />
      <PostInfo open={open} handleClose={handleClose} postInfo={postData} />
    </div>
  );
};

export default PostList;
