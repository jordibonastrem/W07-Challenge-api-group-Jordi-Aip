const express = require("express");
const bcrypt = require("bcrypt");
/* const { validate } = require("express-validation");
const logInController = require("../controller/logInController");
const loginSchema = require("../Schema/userSchemas"); */

const router = express.Router();

const User = require("../../database/models/user");

router.get("/", async () => {
  User.create({
    username: "usuarioGuay",
    seenSeries: ["serie55", "serie22"],
    isAdmin: false,
    password: await bcrypt.hash("soyUsuario", 10),
  });
});

/*  ESTA LINEA ES COPIADA DE OTRO REPO 
router.post("/login", validate(loginSchema, {}, {}), logInController);  */

module.exports = router;
