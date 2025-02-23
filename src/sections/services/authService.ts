export const resetPasswordService = async (token: string | undefined, newPassword: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (token && newPassword) {
          resolve("Password reset successful");
        } else {
          reject("Invalid token or password");
        }
      }, 1000);
    });
  };
  