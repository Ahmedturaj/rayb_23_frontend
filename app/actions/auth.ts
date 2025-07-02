const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerUser(userData: {
    name: string;
    email: string;
    password: string;
    userType: string;
}) {
    try {
        const response = await fetch(`${API_BASE_URL}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Registration failed",
            };
        }

        return {
            success: true,
            message: data.message,
            data: data.data,
        };
    } catch (error) {
        console.error("Registration error:", error);
        return {
            success: false,
            message: "An error occurred during registration",
        };
    }
}



// Email verification

export async function verifyEmail(token: string, otp: string, type: string) {
    try {
        const url =
            type === "forget-password"
                ? `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-token`
                : `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ otp }),
        });

        const data = await response.json();

        return {
            ok: response.ok,
            data,
        };
    } catch (error) {
        console.error("Verify email error:", error);
        return {
            ok: false,
            data: null,
            error,
        };
    }
}



// Resend OTP

export async function resendOTP(token: string, otp: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/resend-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ otp }),
        });

        const data = await response.json();

        return {
            ok: response.ok,
            data,
        };
    } catch (error) {
        console.error("Resend OTP error:", error);
        return {
            ok: false,
            data: null,
            error,
        };
    }
}


export async function loginUser(credentials: {
    email: string;
    password: string;
}) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            return { success: false, message: data.message || "Login failed" };
        }

        return {
            success: true,
            data: {
                accessToken: data.data.accessToken,
                user: data.data.user
            }
        };
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, message: "An error occurred during login" };
    }
}


export async function forgotPassword(email: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message,
            };
        }

        return {
            success: true,
            message: data.message,
            token: data.data.accessToken
        };
    } catch (error) {
        console.error("Forgot password error:", error);
        return {
            success: false,
            message: "An error occurred while processing your request",
        };
    }
}

export async function resetPassword(resetData: {
    token: string;
    password: string;
}) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${resetData.token}`,
            },
            body: JSON.stringify({ newPassword: resetData.password }),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Password reset failed",
            };
        }

        return {
            success: true,
            message: "Password has been reset successfully",
        };
    } catch (error) {
        console.error("Reset password error:", error);
        return {
            success: false,
            message: "An error occurred while resetting your password",
        };
    }
}

// Update logout to use NextAuth signOut
export async function logout() {
    // This should be handled by NextAuth signOut on the client side
    return {
        success: true,
        message: "Logged out successfully",
    };
}