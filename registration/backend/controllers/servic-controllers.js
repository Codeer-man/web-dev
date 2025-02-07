const Service = require("../models/service");

// searching services

const service = async (req, res) => {
  try {
    const findService = await Service.find();

    if (!findService) {
      return res.status(401).json({
        msg: "service not found",
      });
    }

    return res.status(200).json({
      data: findService,
    });
  } catch (error) {
    console.log("server error", error);
    res.status(500).json({
      msg: "internal server error",
      error: error,
    });
  }
};

const makeService = async (req, res) => {
  try {
    const { service, description, price, provider } = req.body;

    if (!service && !description && !price && !provider) {
      return res.status(500).json({
        msg: "Please fill all the inputs",
      });
    }

    const createService = new Service({
      service,
      description,
      price,
      provider,
    });
    await createService.save();


    if (existingService) {
      return res.status(200).json({
        msg: "Service already exist",
      });
    }

    return res
      .status(201)
      .json({ msg: "Service created successfully", data: createService });
  } catch (error) {
    console.log("server error", error);
    res.status(500).json({
      msg: "internal server error",
      error,
    });
  }
};

module.exports = { service, makeService };
