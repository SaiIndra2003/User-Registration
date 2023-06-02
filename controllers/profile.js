const User = require("../Schema/User");

exports.get_user_profile = async (req, res, next) => {
  try {
    const userId = req.cookie.userId;
    const foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      return res.status(500).json({
        message: "Unauthorized",
      });
    } else {
      console.log("Sending user details.....");
      return res.status(201).json({
        message: "Sending user details..",
        data: {
          name: foundUser.name,
          email: foundUser.email,
          contact: foundUser.contact,
          username: foundUser.username,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

exports.update_user_profile = async (req, res, next) => {
  try {
    const userId = req.cookies.userId;
    const foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      return res.status(500).json({
        message: "Unauthorized",
      });
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: req.body },
        { new: true }
      );
      return res.status(201).json({
        message: "Data Updated....",
        data: {
          name: foundUser.name,
          email: foundUser.email,
          contact: foundUser.contact,
          username: foundUser.username,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};
