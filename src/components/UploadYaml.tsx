// components/UploadYaml.tsx

import { API } from "../services/api";


const UploadYaml = ({ setData }: any) => {
  const handleUpload = async (e: any) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    const res = await API.post(
      "question-bank/preview",
      formData
    );

    setData(res.data.data);
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
    </div>
  );
};

export default UploadYaml;