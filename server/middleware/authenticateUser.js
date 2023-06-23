const authenticateUser = (req, res, next) => {
  console.log("Authenticate User Middleware");
  if (req.body.id && req.session.userId) {
    req.user = { _id: req.session.userId };
    next();
  } else {
    res.status(401).json({ success: false, message: "Authentication failed" });
  }
};

export default authenticateUser;
