/* eslint-disable no-console */
import routes from "../routes";
import dbConfig from "../config/db";
const conn = dbConfig.init();
dbConfig.connect(conn);

export const home = async (req, res) => {
    console.log("Hello~");
    try {
        await conn.query("SELECT * FROM user", function(err, files, fields){
            if (err){
                console.log('🔴 Query is not executed. Select Fail..\n');
                res.render("home", { pageTitle: "Home", files: [] });
            }
            else{
                console.log('✅ Query is executed.\n');
                res.render("home", { pageTitle: "Home", files }); // render DB에 저장된 video의 내용을 보여준다  
            }
        });
    } catch (error) {
        console.log(error);
    }
};
/*
export const search = async (req, res) => {
    console.time("SearchFunction");
    const {
        query: { term: searchingBy },
    } = req; // == const searchingBy = req.query.term;
    let files = [];
    try {
        files = await File.find({
        title: { $regex: searchingBy, $options: "i" }, // i를 옵션으로 추가하면 insensitive.. 대소문자 구분 안함.
        });
        console.timeEnd("SearchFunction");
    } catch (error) {
        console.log(error);
    }
    res.render("search", { pageTitle: "Search", searchingBy, files });
};


// upload 또한 upload를 준비하기 위한 get 페이지와 실제 데이터를 보내는 post 페이지가 필요하다.
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  // const {} 를 통해 body를 받아와 요청하는 정보들을 확인한다.
  // 이는 pug와 db.js를 확인해야하는 듯 하다.
  console.time("UploadFunction");
  const {
    body: { title },
    file: { path }, // path로 할때는 로컬의 경로. S3는 location
  } = req; // file에 path라는 요소가 있다.

  const newFile = await File.create({
    fileUrl: path,
    title,
    // 여기있는 fileUrl, title은 fileDB의 속성이다.
  });
    console.log(newFile);
    console.timeEnd("UploadFunction");
    res.redirect(routes.home);
};

export const fileDetail = async (req, res) => {
  // console.log(req.params); params에 id가 있다는걸 알게 됨
  const {
    params: { id },
  } = req;
  try {
    const file = await File.findById(id);
    res.render("fileDetail", { pageTitle: file.title, file });
  } catch (error) {
    res.redirect(routes.home);
  }
};


export const deleteFile = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const file = await File.findById(id);
    // video를 받아서 render로 통해 템플릿으로 던져준다,
    if (String(file.creator) !== req.user.id) {
      throw Error();
    } else {
      await File.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  // 삭제를 실패하던 성공하던 home으로 redirect한다.
  res.redirect(routes.home);
};

*/