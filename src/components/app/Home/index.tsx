import axios from 'axios';
import React, { useState } from 'react';

const Home: React.FC = () => {
  const [image, setImg] = useState('');
  const handleUpload = async () => {
    try {
      const categories = ['60816e224edd74546c2a6c1d'];
      const form = new FormData();
      form.append('name', 'new product');
      form.append('price', '1000');
      categories.map((category, index) => {
        form.append(`categories[${index}]`, category);
      });
      form.append('featuredImg ', image);
      const { data } = await axios.post(
        'http://139.180.196.41:6969/adminPanel/api/product',
        form,
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FjdGl2ZSI6dHJ1ZSwiZnVsbG5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInJvbGUiOiI2MDdjZjRhMjk0YmI3NjUxZWQ2MmNiMTYiLCJjcmVhdGVkQXQiOiIyMDIxLTA0LTE5VDAzOjExOjE0LjkzOFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTA0LTE5VDAzOjExOjE0LjkzOFoiLCJpYXQiOjE2MTkwOTk2OTMsImV4cCI6MTYxOTcwNDQ5M30.s8lIiplysUsZmVdGNVt_vHboSLJp271A7pqmvS2fiaE',
            'Content-type': 'multipart/form-data',
          },
        }
      );
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleUploadChange = (e: any) => {
    const file = e.target.file;
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = () => {
      setImg(`data:${file.type};base64,${btoa(reader.result as any)}`);
    };

    reader.onerror = function () {
      console.log('error on load image');
    };
  };
  return (
    <div>
      <div>
        <input
          accept='image/*'
          className='hidden'
          id='button-file'
          type='file'
          onChange={handleUploadChange}
        />
      </div>
      <button onClick={handleUpload}>create product</button>
    </div>
  );
};

export default Home;
