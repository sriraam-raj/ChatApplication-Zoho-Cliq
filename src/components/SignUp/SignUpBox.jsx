import React, { useState,useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { emailOtp,  checkEmail } from '../../api/authentication/user';
import { validateEmail } from '../Validators/email';
import { validatePassword } from '../Validators/password';
import { validateMobileNumber } from '../Validators/mobileNumber';
import { useNavigate } from 'react-router-dom';



export default function SignUpBox({changeValidity}){
    const [email, setEmail] = useState('richardjoel835@gmail.com');
    const [password, setPassword] = useState('30-MaY-02');
    const [mobileNumber, setMobileNumber] = useState('9876543210');
    const [checked, setChecked] = useState(true);
    const [btnText,setBtnText] = useState("Start your Free Trial")
    const [loading,setLoading] = useState(true);
    const [emailExists, setEmailExists] = useState(false);
    const [errorMsg,setErrorMsg] = useState({email:true,pswrd:true,mobileNo:true,isChecked:true});    
    
    const navigate = useNavigate();

    const checkValidity = () => {
        const error={}
        !validateEmail(email)? error.email = false:error.email = true;

        !validatePassword(password)?error.pswrd=false:error.pswrd = true;

        !validateMobileNumber(mobileNumber)?error.mobileNo=false:error.mobileNo=true;
           
        !checked?error.isChecked=false:error.isChecked=true;
        
        setErrorMsg(()=>{return {...error}})
        return error;
    }
    const handleChange = (e) => {
        e.preventDefault();
        if(e.target.name == "email"){
            setEmail(e.target.value);
        }
        else if(e.target.name == "password"){
            setPassword(e.target.value);
        }
        else if(e.target.name == "rmobile"){
            setMobileNumber(e.target.value);
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(email,password,mobileNumber);
        const error=checkValidity();
        if(error.email && error.pswrd && error.mobileNo && error.isChecked){
            setBtnText("Creating Your Account...")
            let emailExists = await checkEmail({email})
            if(!emailExists) 
            {
                console.log(emailExists);
                emailOtp({email});
                setTimeout(()=>changeValidity({email,password,mobileNumber}),2000);
            } 
            else {
                setBtnText("Start Your Free Trail")
                setEmailExists(true);
            }
        }
    }
    return <>
                <div className="signup-box">
                    <div className="signup-frm">
                        <form method="post">
                            <div className="signup-container">
                                <div className="email sgfrm">
                                    <div className="wrap-elm">
                                        {/* <span className="placeholder">Email *</span> */}
                                        <input className="placeholder" id="email" name="email" placeholder="Email" type="text" value={email} onChange={handleChange}/>
                                        {!errorMsg.email && <div className="field-msg">
                                            <span id="email-error" className="error jqval-error">Please enter a valid email address</span>
                                        </div>}
                                        {emailExists && <span id="email-error" className="error jqval-error">An account already exists for this email address. <a href="#" onClick={()=>navigate('/signin')} tabIndex="-1">Sign in</a> or use a different email address to sign up.</span>}
                                    </div>
                                </div>
                                <div className="password sgfrm">
                                    <div className="wrap-elm">
                                        {/* <span className="placeholder">Email *</span> */}
                                        <input className="placeholder" id="password" name="password" placeholder="Password" type="password" value={password} onChange={handleChange}/>
                                        {!errorMsg.pswrd && <div className="field-msg"><span id="password-error" className="error jqval-error">Password cannot be less than 8 characters</span></div>}
                                    </div>
                                </div>
                                <div className="za-rmobile-container sgfrm rmobiledisabled">
                                    <div align="left" className="za-country_code-container "> 
                                        <input className="phone_countrycode" name="x_phone_countrycode" type="hidden" value="+91" placeholder="" mandate="false"/>
                                        <div className="ccodelabel" id="countryCodeDiv">
                                            <div className="ccodediv" id="ccodediv" style={{paddingTop:"3px"}}>+91</div>
                                        </div>
                                        {/* <span className="dialphonenum placeholder">Phone Number *</span> */}
                                        <input id="rmobile" className="dialphone" name="rmobile" placeholder="Mobile Number" style={{paddingLeft:"90px",width:"84%"}} spellCheck="false" type="text" value={mobileNumber} onChange={handleChange}/>
                                        {!errorMsg.mobileNo && <div className="field-msg"><span id="rmobile-error" className="error jqval-error">Please enter a valid mobile number.</span></div>}
                                    </div>
                                </div>
                                <p className="zcountry-info zshow">It looks like you???re in<span id="zip-countryname"> india </span><span>based on your IP</span>.<span id="zip-countryname-change">Change Country</span></p>

                                <div className="sgnbtnmn" style={{width:"104%"}}>
                                    
                                    <div className="za-tos-container flex justifySB dflxcent" >
                                    <Checkbox
                                    checked={checked}
                                    onChange={()=>setChecked((checked)=>!checked)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                        <label className="sign_agree" htmlFor="tos">
                                            I agree to the 
                                            <a href="https://www.zoho.com/cliq/terms.html" target="_blank" rel="noopener">Terms of Service </a> 
                                            and 
                                            <a className="zrlink" href="https://www.zoho.com/privacy.html" target="_blank" rel="noopener"> Privacy Policy</a>.
                                            {/* <input className="za-tos signup-termservice" id="tos" name="tos" onClick="toggleTosField()" tabIndex="1" type="checkbox" value="false" placeholder=""/> */}
                                        </label>
                                    </div>
                                            {!errorMsg.isChecked && <div className="field-msg"><span id="tos-error" className="error jqval-error">Please read and accept the Terms of Service and Privacy Policy</span></div>}
                                    <div className="sgnbtn">
                                        <input className="signupbtn" onClick={handleSubmit} id="signupbtn" type="submit" value={btnText} style={{opacity: "1"}} placeholder=""/>
                                    </div>
                                </div>
                                <div className="socl-signup"> 
                                    <p><b>or sign in using  </b>
                                        <span className="vi-google"  title="Google">Google</span>
                                        <span className="vi-facebook"  title="Facebook" >Facebook</span>
                                        <span className="vi-linkedin"  title="Linkedin">Linkedin</span>
                                        <span className="vi-twitter"  title="Twitter" >Twitter</span>
                                        <span className="vi-office365"  title="Office365">Office365</span>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
    
    </>;
}