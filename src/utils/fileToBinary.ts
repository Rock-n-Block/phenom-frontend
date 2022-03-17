const fileToBinary = (file: File) => {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.readAsBinaryString(file);
  });
};

export default fileToBinary;
