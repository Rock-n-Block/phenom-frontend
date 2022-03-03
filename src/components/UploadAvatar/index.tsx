import { useState, VFC } from 'react';

const UploadAvatar: VFC = () => {
  const [file] = useState<File | null>(null);
  console.log(file);
  return <div />;
};

export default UploadAvatar;
