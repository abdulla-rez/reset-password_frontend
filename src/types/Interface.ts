export interface SignupData { name: string; email: string; password: string; }
export interface LoginData { email: string; password: string; }
export interface ForgotData { email: string; }
export interface ResetData { password: string; confirmPassword: string; }
