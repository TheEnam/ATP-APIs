import {z} from "zod";

export class AuthSchema{
    static register = z.object({
        email:z.string().email().min(1).max(255),
        password: z.string().min(6).max(255),
        confirmPassword: z.string().min(6).max(255),
        userAgent: z.string().optional(),
    }).refine((data) => data.password === data.confirmPassword,{
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

    static validateRegister(data: z.infer<typeof AuthSchema.register>){
        return this.register.parse(data);
    }



    static login = z.object({
        email: z.string().email().min(1).max(255),
        password: z.string().min(6).max(255),
    });

    static validateLogin(data: z.infer<typeof AuthSchema.login>){
        return this.login.parse(data);
    }

    static verificationCodeSchema = z.string().min(1).max(24);


    static validateVerificationCode(data: z.infer<typeof AuthSchema.verificationCodeSchema>){
        return this.verificationCodeSchema.parse(data);
    }

    static resetPassword = z.object({
     
        password: z.string().min(6).max(255),
        verificationCode: z.string().min(1).max(24)
    });
}
export const emailSchema = z.string().email().min(1).max(255);

export const passwordSchema = z.string().min(6).max(255);

