import { useRef } from 'react'
import { uploadImg } from '../services/cloudinary-service'

export function RecipeImg({ imgUrl, onChangeImg }) {

    const inputRef = useRef()

    const onUploadImg = async (ev) => {
        const res = await uploadImg(ev)
        onChangeImg(res.url)

    }



    const onTriggerImgUpload = () => {
        inputRef.current.click()
    }

    const imgSrc = require('../assets/imgs/cloud-upload.jpeg')
    return (
        <section className="recipe-img">
            {imgUrl ?
                <section onClick={onTriggerImgUpload} className="img-container" style={{ backgroundImage: `url(${imgUrl})` }} >

                </section> :

                <section className="img-upload">
                    <label htmlFor="imgUploader">
                        <img className='img-placeholder' src={imgSrc} alt="" />
                    </label>
                </section>}
            <input ref={inputRef} type="file" id="imgUploader" onChange={onUploadImg} hidden />
        </section>
    )
}
