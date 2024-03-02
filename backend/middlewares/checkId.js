import { isValidObjectId } from "mongoose";

const checkId = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(404).json({ message: `${req.params.id} không hợp lệ!` });
  } else {
    next();
  }
};

export default checkId;
