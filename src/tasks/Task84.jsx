import React from 'react'
import ImageUpload from '../components/ImageUpload'

export default function Task84() {
  return (
    <div>
      <ImageUpload multiple={true} maxImages={5} maxSize={10}/>
    </div>
  )
}
