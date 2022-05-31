
export function InputSwitch({ value, onChange }) {
    return (
        <div className='input-switch'>
            <input checked={value} onChange={onChange} type="checkbox" name="switch" id="cb2" className="tgl tgl-light" />
            <label  htmlFor="cb2" className="tgl-btn"></label>
            <h4>Fixed Mode?</h4>
        </div>
    )
}



// h4 iOS
// input#cb2.tgl.tgl-ios(type = "checkbox")
// label.tgl-btn(for = "cb2")

