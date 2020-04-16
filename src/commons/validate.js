const validate = (value) => {
  const err = {};
  const { title, description } = value;
  if (!title) {
    err.title = "Vui lòng nhập tiêu đề";
  } else if (title.trim().length < 5) {
    err.title = "Tiêu đề phải hơn 5 ký tự";
  }

  if (!description) {
    err.description = "Vui lòng nhập mô tả";
  }
  return err;
};

export default validate;
