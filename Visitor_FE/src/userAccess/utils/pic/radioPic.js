import React ,{useState ,useEffect } from 'react'

export default function RadioPic({onPic}){
    const [clicked ,setClicked ] = useState()
    const clicking=(e)=>{
        const id =  e.target.id
        const element = document.getElementById(id)
        setClicked(element.getAttribute('value'))
        const all = document.getElementById('pic-div').childNodes
        for(var i=0; i<all.length; i++) {
            if(all[i].nodeName.toLowerCase() == "div"){
                all[i].style.border = "3px solid white"
            }
        }
        element.style.border = "3px solid purple"
    }
        useEffect(()=>{
        if(!clicked)return
        onPic(clicked)
    },[clicked])

    return (
        <div className="form-group pic-div" id="pic-div"  >
            {/* <div className="verify-pic" id="1"  onClick={(e)=>clicking(e)} value="1"  > <img src={`${require('../../../photo/mpic/meezan1.png')}`} /> </div>
            <div className="verify-pic" id="2"  onClick={(e)=>clicking(e)} value="2"  > <img src={`${require('../../../photo/mpic/m2.jpg')}`} /> </div >
            <div className="verify-pic" id="3"  onClick={(e)=>clicking(e)} value="3"  > <img src={`${require('../../../photo/mpic/m3.png')}`} /> </div >
            <div className="verify-pic" id="4"  onClick={(e)=>clicking(e)} value="4"  > <img src={`${require('../../../photo/mpic/m4.png')}`} /> </div >
            <div className="verify-pic" id="5"  onClick={(e)=>clicking(e)} value="5"  > <img src={`${require('../../../photo/mpic/m5.png')}`} /> </div >
            <div className="verify-pic" id="6"  onClick={(e)=>clicking(e)} value="6"  > <img src={`${require('../../../photo/mpic/m6.png')}`} /> </div >
            <div className="verify-pic" id="7"  onClick={(e)=>clicking(e)} value="7"  > <img src={`${require('../../../photo/mpic/m7.png')}`} /> </div >
            <div className="verify-pic" id="8"  onClick={(e)=>clicking(e)} value="8"  > <img src={`${require('../../../photo/mpic/m8.png')}`} /> </div >
            <div className="verify-pic" id="9"  onClick={(e)=>clicking(e)} value="9"  > <img src={`${require('../../../photo/mpic/m9.png')}`} /> </div > */}
            {/* <div className="verify-pic" id="10" onClick={(e)=>clicking(e)} value="10"  > <img src={`${require('../../../photo/mpic/m10.png')}`} /> </div > */}
        </div>
    )
}
