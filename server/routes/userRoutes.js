const express = require("express");
/* const bcrypt = require("bcrypt"); */
const { validate } = require("express-validation");
const { loginUser } = require("../controllers/usersControllers");
const { loginSchema } = require("../schemas/userSchema");

const router = express.Router();

/* const User = require("../../database/models/user");

router.get("/", async () => {
  User.create({
    username: "usuarioGuay",
    seenSeries: ["serie55", "serie22"],
    isAdmin: false,
    password: await bcrypt.hash("soyUsuario", 10),
  });
}); */

router.post("/login", validate(loginSchema), loginUser);

module.exports = router;
