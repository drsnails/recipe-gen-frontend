import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { uploadImg } from '../services/cloudinary-service'
import { setDialogOpen } from '../store/actions/dialogMsgActions'
import { setLoading } from '../store/actions/loaderActions'

export function RecipeImg({ imgUrl, onChangeImg, isEdited }) {
    const dispatch = useDispatch()

    const inputRef = useRef()

    const onUploadImg = async (ev) => {

        const _uploadImg = async () => {
            if (!ev.target.files[0]) return
            try {
                dispatch(setLoading(true))
                const res = await uploadImg(ev)

                onChangeImg(res.url)
            } catch (err) {
                console.log(err);
            } finally {

            }
        }

        _uploadImg(ev)
        // if (isEdited) {
        //     dispatch(setDialogOpen({ txt: 'Are you sure you want to proceed?', title: 'This will save any unsaved changes', successCb: () => _uploadImg(ev) }))

        // } else {
        //     _uploadImg(ev)
        // }


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
