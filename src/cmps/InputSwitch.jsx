
export function InputSwitch({ value, onChange, txt, id }) {
    return (
        <div className='input-switch'>
            <input checked={value} onChange={onChange} type="checkbox" name="switch" id={id} className="tgl tgl-light" />
            <label htmlFor={id} className="tgl-btn"></label>
            <h4>{txt}</h4>
        </div>
    )
}



// h4 iOS
// input#cb2.tgl.tgl-ios(type = "checkbox")
// label.tgl-btn(for = "cb2")

