import { Link } from "gatsby";
import React, { useRef } from "react"
import Layout from "../components/layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faEnvelopeOpen } from "@fortawesome/free-regular-svg-icons"
import { faPhone, faPen, faUser } from "@fortawesome/free-solid-svg-icons";

const About = () =>
    <Layout isContent>
        <div className="lg:m-5 sm:m-2 md:m-2">
            <div className="box-border border-2 lg:flex border-gray-100">
                <div className="m-4 flex-none"><img className="m-0" src="https://avatars.githubusercontent.com/u/1178415?v=4"  alt="profile pic"/></div>
                <div className="m-5">
                    <p className="mb-1">Hello Everybody, I'm</p>
                    <p className="text-4xl mb-1">Arun Madhavan Govindarajan</p>
                    <p className="font-light text-base text-gray-500 uppercase">Solution Architect @ Ford</p>
                    <p className="text-sm">
                        Passionate Developer, currently working as a Solution Architect piecing things together to build great software.
                        Learning never ends is my core philosophy. Loves to cook, listen to music and playing with my daughter. 
                    </p>
                    <div className="flex flex-col gap-1 text-sm">
                        <div><Link to="https://www.linkedin.com/in/arunmadhavang/"><FontAwesomeIcon icon={faLinkedin} /><span className="ml-3">@arunmadhavang</span></Link></div>
                        <div className="lg:col-span-2"><Link to="https://github.com/arunmadhavan-g"><FontAwesomeIcon icon={faGithub} /><span className="ml-3">@arunmadhavan-g</span></Link></div>
                        <div><a href="mailto:arunmadhavan.g@gmail.com"><FontAwesomeIcon icon={faEnvelopeOpen} /><span className="ml-3">arunmadhavan.g@gmail.com</span></a></div>
                        <div className="lg:col-span-3"><Link to="/Profile"><FontAwesomeIcon icon={faUser} /><span className="ml-3">Profile</span></Link></div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>

export default About;