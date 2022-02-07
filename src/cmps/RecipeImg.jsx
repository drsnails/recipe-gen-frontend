import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { uploadImg } from '../services/cloudinary-service'
import { setDialogOpen } from '../store/actions/dialogMsgActions'
import { setLoading } from '../store/actions/loaderActions'
import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons'
export function RecipeImg({ imgUrl, onChangeImg, isEdited }) {
    const dispatch = useDispatch()
    const [isExpand, setIsExpand] = useState();
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



    const onTriggerImgUpload = (ev) => {
        ev.stopPropagation()
        inputRef.current.click()
    }

    
    const onRemoveImg = (ev) => {
        ev.stopPropagation()
        onChangeImg(null, true)
        setIsExpand(false)
    }


    const expandClass = isExpand ? 'expand' : ''
    const imgClass = imgUrl ? 'img-class' : ''

    const imgSrc = require('../assets/imgs/cloud-upload.jpeg')
    return (
        <section className='recipe-img-container'>

            <section className={`recipe-img ${expandClass} ${imgClass}`}>
                {imgUrl ?
                    <section onClick={() => setIsExpand(prevExpand => !prevExpand)} className="img-container" style={{ backgroundImage: `url(${imgUrl})` }} >
                        <section className={`img-actions ${expandClass}`}>
                            <button onClick={onTriggerImgUpload}><FontAwesomeIcon icon={faImage} /> <span>Change</span></button>
                            <button onClick={onRemoveImg}><FontAwesomeIcon icon={faTrash} /> <span>Remove</span></button>
                        </section>
                    </section> :

                    <section className="img-upload">
                        <label htmlFor="imgUploader">
                            <img className='img-placeholder' src={imgSrc} alt="" />
                        </label>
                    </section>}
                <input ref={inputRef} type="file" id="imgUploader" onChange={onUploadImg} hidden />
            </section>
        </section>
    )
}
