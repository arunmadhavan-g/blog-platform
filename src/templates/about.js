import { Link } from "gatsby";
import React, { useRef } from "react"
import Layout from "../components/layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faEnvelopeOpen } from "@fortawesome/free-regular-svg-icons"
import { faPhone, faPen, faUser } from "@fortawesome/free-solid-svg-icons";

const About = () =>
    <Layout isContent>
        <div className="m-10">
            <div className="box-border border-2 flex border-gray-100">
                <div className="m-4 flex-none"><img className="m-0" src="https://avatars.githubusercontent.com/u/1178415?v=4"  alt="profile pic"/></div>
                <div className="m-5">
                    <p>Hello Everybody, I'm</p>
                    <p className="text-4xl">Arun Madhavan Govindarajan</p>
                    <p className="font-light text-base text-gray-500 uppercase">Solution Architect @ Ford</p>
                    <p>
                        Naan ippidiyaaa patta oru appa taker, idhe pathi naa gethaa yeludhuven
                        vetti thanmaa something or the other will be written here
                    </p>
                    <div className="flex flex-col gap-1">
                        <div><Link to="https://www.linkedin.com/in/arunmadhavang/"><FontAwesomeIcon icon={faLinkedin} /><span className="ml-3">@arunmadhavang</span></Link></div>
                        <div className="lg:col-span-2"><Link to="https://github.com/arunmadhavan-g"><FontAwesomeIcon icon={faGithub} /><span className="ml-3">@arunmadhavan-g</span></Link></div>
                        <div><a href="mailto:arunmadhavan.g@gmail.com"><FontAwesomeIcon icon={faEnvelopeOpen} /><span className="ml-3">arunmadhavan.g@gmail.com</span></a></div>
                        <div className="lg:col-span-3"><a href="callto:+919840808667"><FontAwesomeIcon icon={faPhone} /><span className="ml-3">+91 98408 08667</span></a></div>
                        <div className="lg:col-span-3"><Link to="/Profile"><FontAwesomeIcon icon={faUser} /><span className="ml-3">Profile</span></Link></div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>

export default About;