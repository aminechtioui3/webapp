export const resetPasswordService = async (token: string | undefined, newPassword: string): Promise<string> => new Promise((resolve, reject) => {
      setTimeout(() => {
        if (token && newPassword) {
          resolve("Password reset successful");
        } else {
            // eslint-disable-next-line prefer-promise-reject-errors
          reject("Invalid token or password");
        }
      }, 1000);
    });
  