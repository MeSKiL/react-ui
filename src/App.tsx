import React, {useEffect, useState} from 'react'
import axios from 'axios'

interface IAppPropsType {

}

const App: React.FC<IAppPropsType> = () => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const uploadedFile = files[0]
      const formData = new FormData()
      formData.append(uploadedFile.name, uploadedFile)
      axios.post('https://jsonplaceholder.typicode.com/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        console.log(res)
      })
    }
  }
  return (
    <div className='App' style={{marginTop: '100px', marginLeft: '100px'}}>
      <input type="file" name='myFile' onChange={handleFileChange}/>
    </div>
  )
}

export default App;
