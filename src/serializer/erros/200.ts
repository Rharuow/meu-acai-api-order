export const success = (message?: string) => {
  return { message: message || "Success", status: 200 };
};
