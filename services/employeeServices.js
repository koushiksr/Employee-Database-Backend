const EmployeeDetails = require("../models/EmployeeSchema");
class EmployeeServices {
  constructor() {}

  createOne = async (body) => {
    return await EmployeeDetails.create(body);
  };
  getAll = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const skip = (page - 1) * pageSize;

    return await EmployeeDetails.find()
      .sort({ createdDate: -1 })
      .skip(skip)
      .limit(pageSize)
      // .toArray();
  };
  getAllWithoutPAgination = async () => {
    console.log("service get all ")
    const allData = await EmployeeDetails.find()
    return  allData;
  };
  getOne = async (email) => {
    return await EmployeeDetails.findOne({ email: email });
  };

  updateOne = async (Email, body) => {
    const query = [{ email: Email }, { $set: body }];
    const updated = await EmployeeDetails.findOneAndUpdate(
      { email: Email },
      { $set: body }
    );
    return updated;
  };
  findByIdAndRemove = async (Gmail) => {
    return await EmployeeDetails.findOneAndDelete({ email: Gmail });
  };
}

module.exports = EmployeeServices;
