"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = __importStar(require("nodemailer"));
const fs = require("fs");
require("dotenv").config();
const path = require("path");
const htmlDocument = fs.readFileSync(
  path.join(__dirname, "/SmartmailTemplate.html"),
  "utf-8"
);
const options = {
  host: process.env.SMTP_SERVER_HOST,
  port: process.env.SMTP_SERVER_PORT,
  secure: true,
  auth: {
    user: process.env.RESERVATION_EMAIL_ADDRESS,
    pass: process.env.RESERVATION_EMAIL_PASSWORD,
  },
};
const transporter = nodemailer.createTransport(options);
//send mail
function sendMail(options) {
  return __awaiter(this, void 0, void 0, function* () {
    //   send email to the user
    // const templateFile = htmlDocument
    //   .replace("{{customer_name}}", `${options.firstName} ${options.lastName}`)
    //   .replace("{{suite}}", options.suite)
    //   .replace("{{number_of_nights}}", options.numberOfNights)
    //   .replace("{{reservation_date}}", options.reservationDate)
    //   .replace("{{checkin_date}}", options.checkInDate)
    //   .replace("{{checkout_date}}", options.checkOutDate)
    //   .replace("{{amount_paid}}", options.amountPaid)
    //   .replace("{{currency}}", options.currency);
    try {
      const info = yield transporter.sendMail({
        from: "Smart Layer <hello@smart-layer.network>",
        // to: options.email,
        // to: "praisechi4@gmail.com",
        to: "test-lcz395xsg@srv1.mail-tester.com",
        // to: "bluedonice@gmail.com",
        subject: "Mint smartlayer pass",
        text: "Click link to mint",
        html: htmlDocument,
      });
      console.log(info);
      return {
        isEmailSent: true,
      };
    } catch (err) {
      console.log(err);
      return { isEmailSent: false };
    }
  });
}
module.exports = sendMail;
