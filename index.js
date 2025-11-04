const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const Teacher = require("./model/Teacher");
const validateTeacherData = require("./validations/teacherValidations");

app.post("/api/teachers", async (req, res) => {
  try {
    const validation = await validateTeacherData(req.body);
    if (!validation.valid) {
      return res.status(400).json({ msg: validation.msg });
    }

    const { password, ...rest } = validation.sanitizedData;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newTeacher = await Teacher.create({
      ...rest,
      password: hashedPassword,
    });

    const teacherData = newTeacher.get({ plain: true });
    delete teacherData.password;

    return res.status(201).json({
      msg: "Teacher created successfully",
      teacher: teacherData,
    });
  } catch (err) {
    console.error("Error creating teacher:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
});
app.listen(port, () => console.log(`Server started on port ${port}`));
