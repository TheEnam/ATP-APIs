const getEnv = (key:string,defaultValue? :string):string =>{
    const value = process.env[key] || defaultValue;

    if(value === undefined){
        throw new Error(`Missing Environment variable ${key}`);
    }

    return value;
}

export const MONGO_URI = getEnv("MONGO_URI");
export const NODE_ENV = getEnv("NODE_ENV", "production");
export const PORT = getEnv("PORT", "4004");
export const APP_ORIGIN = getEnv("APP_ORIGIN");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");
//export const EMAIL_SENDER = getEnv("EMAIL_SENDER");
//export const RESEND_API_KEY = getEnv("RESEND_API_KEY");
export const SMTP_USERNAME = getEnv("SMTP_USERNAME");
export const SMTP_PASSWORD = getEnv("SMTP_PASSWORD");
export const SMTP_HOST = getEnv("SMTP_HOST");
export const SMTP_PORT = getEnv("SMTP_PORT", "587");