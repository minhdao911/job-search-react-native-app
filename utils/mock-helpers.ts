export const mockData = (data: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data });
    }, 1000);
  });
};
