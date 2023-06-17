import React from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const FileUploader = ({ handleUpload }) => (
    <input type="file" onChange={handleUpload} />
);

export default FileUploader;
