import React , {} from 'react'
import ReCAPTCHA from "react-google-recaptcha";
export default function Captcha({onId}) {

    return (
            <ReCAPTCHA
                onChange={value=> onId(value)}
                sitekey="6LcHjeQZAAAAADaATTSHH41bbEToRhJZdcsJv-fB"

            />
    )
}
