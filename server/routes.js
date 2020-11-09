// Global
const HOME = "/";
const SEARCH = "/search";

// Files
const FILES = "/files";
const UPLOAD = "/upload";
const FILE_DETAIL = "/:id";
const DELETE_FILE = "/:id/delete";



const routes = {
  home: HOME,
  search: SEARCH,
  files: FILES,
  upload: UPLOAD,
  fileDetail: (id) => {
    if (id) {
      return `/files/${id}`;
    } else {
      return FILE_DETAIL;
    }
  },
  deleteFile: (id) => {
    if (id) {
      return `/files/${id}/delete`;
    } else {
      return DELETE_FILE;
    }
  },
};
// template에서 직접 접근이 필요한 경우 함수로 바꿔준다.
export default routes;
