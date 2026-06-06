const getProfile = async (req, res) => {
  res.status(200).json({
    message: "Profile Access Granted",
    user: req.user,
  });
};

module.exports = {
  getProfile,
};