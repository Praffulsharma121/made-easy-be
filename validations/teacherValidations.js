const { Sequelize } = require("sequelize");
const Teacher = require("../model/Teacher");

function sanitizeInput(value) {
  if (typeof value !== "string") return value;
  return value.replace(/[<>;'"]/g, "").trim();
}

async function validateTeacherData(data) {
  const cleanData = {};
  for (const key in data) {
    cleanData[key] = Array.isArray(data[key])
      ? data[key].map((v) => sanitizeInput(v))
      : sanitizeInput(data[key]);
  }

  const {
    full_name,
    email,
    phone_number,
    date_of_birth,
    subjects,
    years_of_experience,
    highest_qualification,
    username,
    password,
  } = cleanData;

  const requiredFields = {
    full_name,
    email,
    phone_number,
    date_of_birth,
    subjects,
    years_of_experience,
    highest_qualification,
    username,
    password,
  };

  const missing = Object.entries(requiredFields)
    .filter(([_, val]) => !val || val === "")
    .map(([key]) => key);

  if (missing.length > 0) {
    return {
      valid: false,
      msg: `Missing required field${
        missing.length > 1 ? "s" : ""
      }: ${missing.join(", ")}`,
    };
  }

  if (!email.includes("@") || !email.includes(".")) {
    return { valid: false, msg: "Invalid email format" };
  }

  const isNumeric = !isNaN(phone_number);
  if (!isNumeric || phone_number.length !== 10) {
    return { valid: false, msg: "Invalid phone number, must be 10 digits" };
  }

  if (password.length < 6) {
    return { valid: false, msg: "Password must be at least 6 characters long" };
  }

  const existing = await Teacher.findOne({
    where: { [Sequelize.Op.or]: [{ email }, { username }] },
  });

  if (existing) {
    const duplicateFields = [];
    if (existing.email === email) duplicateFields.push("email");
    if (existing.username === username) duplicateFields.push("username");
    return {
      valid: false,
      msg: `Teacher with this ${duplicateFields.join(" and ")} already exists`,
    };
  }

  return { valid: true, sanitizedData: cleanData };
}

module.exports = validateTeacherData;
