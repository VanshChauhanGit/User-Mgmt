import { body } from "express-validator";

export const registerValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .matches(/^[A-Za-z0-9_]+$/)
    .withMessage("Username must be alphanumeric (underscores allowed)"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number"),
];

export const loginValidation = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const recordValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("phone").trim().notEmpty().withMessage("Phone number is required"),
  body("age")
    .isInt({ min: 0 })
    .withMessage("Age must be a non-negative integer"),
  body("father").trim().notEmpty().withMessage("Father's name is required"),
];

