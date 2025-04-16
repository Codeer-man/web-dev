"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = void 0;
const errorHandler_1 = require("../utils/errorHandler");
const auth_services_1 = require("../services/auth.services");
const verifyEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { otp } = req.body;
        const user = yield (0, auth_services_1.findUserById)(id);
        if (!user) {
            throw new errorHandler_1.ErrorHandler("User not found", 404, false);
        }
        if (user.otp !== otp) {
            throw new errorHandler_1.ErrorHandler("OTP does not match", 400, false);
        }
        yield user.updateOne({ emailVerified: true });
        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.verifyEmail = verifyEmail;
// export const resendOtp = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { userId } = req.body;
//     const user = await User.findById(userId);
//     if (!user) {
//       throw new ErrorHandler("User not found", 404, false);
//     }
//     const newOtp = Math.floor(100000 + Math.random() * 900000);
//     user.otp = newOtp;
//     await user.save();
//     await sendverificationMail(user);
//     res.status(200).json({
//       success: true,
//       message: "OTP resent to your email",
//     });
//   } catch (error) {
//     next(error);
//   }
// };
