import React, {useRef} from "react"
import _ from "lodash";
import dayjs from "dayjs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faEnvelopeOpen } from "@fortawesome/free-regular-svg-icons"
import { faPhone, faPen, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "gatsby"
import Layout from "../components/layout"
import Tags from "../components/tags";

const splitDuration = (duration) => {
    if(_.isEmpty(duration)){
        return {from: null, to:null}
    }
    
    const parts = duration.split("-").map(x => x.trim());
    const fromString = parts[0];
    const toString = parts[1];

    const from = dayjs(fromString, "MMM YYYY");
    const to = toString.includes("Till Date") ? dayjs() : dayjs(toString, "MMM YYYY");
    return { from, to }
    
}

const isWithin5Years = (day, projectName) => {
    const todayMinus5Years= dayjs().subtract(5, 'year')
    return day.isAfter(todayMinus5Years)
}
const isToday = (day) => day.format("MMM YYYY") === dayjs().format("MMM YYYY")

const Section = ({ children, title, className }) =>
    <div className={`border-b mb-0 ${className}`}>
        <div class="text-black font-bold text-base mb-2">{title}</div>
        <div className="px-2">
            {children}
        </div>
    </div>

const getTechList = (profileData) => {    
    const techs= profileData.map(x => x.tech).filter( x => !_.isEmpty(x))
    const fnl = {label: "Framework and Languages", value:[...new Set(techs.filter(x => !_.isEmpty(x.fnl)).flatMap(x => x.fnl))]};
    const cni = {label: "Cloud and Infra", value:[...new Set(techs.filter(x => !_.isEmpty(x.cni)).flatMap(x => x.cni))]};
    const ds = {label: "Data Stores", value:[...new Set(techs.filter(x => !_.isEmpty(x.ds)).flatMap(x => x.ds))]};
    const cicd = {label: "Build & CICD", value:[...new Set(techs.filter(x => !_.isEmpty(x.cicd)).flatMap(x => x.cicd))]};
    const fe = {label: "Front End", value:[...new Set(techs.filter(x => !_.isEmpty(x.fe)).flatMap(x => x.fe))]};
    const otp = {label: "Other Tools and Processes", value:[...new Set(techs.filter(x => !_.isEmpty(x.otp)).flatMap(x => x.otp))]};
    
    return [fnl, cni, ds, cicd, fe, otp]
} 

const mergedTech = (techs) => Object.keys(techs).flatMap(x => techs[x]).filter(x => !_.isEmpty(x))

const Content = ({ pageContext: { profileData } }) => {
    const achievements = profileData.flatMap(x => x.achievements).filter(x => !_.isEmpty(x))
    const summary = profileData.flatMap(x => x.summary).filter(x => !_.isEmpty(x))
    const techList = getTechList(profileData)//[...new Set(profileData.flatMap(x => x.tech).filter(x => !_.isEmpty(x)))]
    const profileDataWithDates = profileData.map(x => ({ ...x, ...splitDuration(x.duration), companyName: (_.isEmpty(x.company)? null: x.company.trim()) }))
    const projectSummary = _.groupBy(
        profileDataWithDates
            .filter(x => !_.isEmpty(x.projectName))
            .sort((x, y) => y.from.diff(x.from))
        , "companyName")

    return (
        <Layout isContent showPrint>
            <div id="profile" className="md:text-sm lg:text-base text-sm">
                <div className="flex justify-between lg:mr-10 lg:mb-9 md:mb-0 sm:mb-0 p-1">
                    <div className="lg:text-3xl sm:text-xl md:text-2xl text-2xl">Arun Madhavan Govindarajan</div>
                    <div className="float-left h-0 lg:w-2/12 md:w-1/5 object-fill relative w-1/5"><img src="https://avatars.githubusercontent.com/u/1178415?v=4"  alt="profile pic"/></div>
                </div>
                <div className="border-b md:pt-0 mt-3 lg:pt-5 sm:pt-0">
                    <div className="text-sm grid lg:grid-cols-4 gap-1 md:grid-cols-1 sm:grid-cols-1">
                        <div><Link to="https://www.linkedin.com/in/arunmadhavang/"><FontAwesomeIcon icon={faLinkedin} /> @arunmadhavang</Link></div>
                        <div><Link to="https://techmusings.dev/"><FontAwesomeIcon icon={faPen} /> https://techmusings.dev/</Link></div>
                        <div className="lg:col-span-2"><Link to="https://github.com/arunmadhavan-g"><FontAwesomeIcon icon={faGithub} /> @arunmadhavan-g</Link></div>
                        <div><a href="mailto:arunmadhavan.g@gmail.com"><FontAwesomeIcon icon={faEnvelopeOpen} /> arunmadhavan.g@gmail.com</a></div>
                        <div className="lg:col-span-3"><a href="callto:+919840808667"><FontAwesomeIcon icon={faPhone} />+91 98408 08667</a></div>
                    </div>
                </div>

                <Section title="Summary" className="mt-1">
                    <ul className="list-disc pb-0 mb-1.5">
                    {summary.map(x => <li className="mb-0">{x}</li>)}
                    </ul>
                </Section>

                <Section title="Technologies">
                <div className="grid grid-cols-5 gap-1 mb-1 ml-2">
                        {
                            techList.map(x => (
                                <>      
                                <div className="text-black border-b border-dashed">{x.label}</div>
                                <div className="italic col-span-4 border-b border-dashed">{x.value.join(", ")}</div>
                                </>
                                )
                            )
                        }
                    </div>
                </Section>

                <Section title="Company Experience">
                    {
                        Object
                            .keys(projectSummary)
                            .map(company => {
                                const sortedSummary = projectSummary[company].sort((x, y) => y.from.diff(x.from))
                                const {from} = _.last(sortedSummary);
                                const {to} = sortedSummary[0]
                            
                                return (
                                    <div className="flex justify-between lg:mr-36">
                                        <div className="col-span-4 text-black">{company}</div>
                                        <div>{from.format('MMM YYYY')}  - {isToday(to) ? "Till Date" : to.format('MMM YYYY')}</div>
                                    </div>
                                )
                            })
                    }
                </Section>

                <Section title="Achievements" className="mt-1">
                    <ul className="list-disc pb-0">
                    {achievements.map(x => <li className="mb-0">{x}</li>)}
                    </ul>
                </Section>

                <Section title="Project Summary">
                    {profileDataWithDates
                    .filter(x => !_.isEmpty(x.projectName))
                    .filter(x => isWithin5Years(x.to, x))
                    .map(x => (
                        <div>
                            <div className="p-1 text-black bg-gray-100 lg:mr-10">{x.projectName} <span className="text-gray-600"> - {x.company}</span></div>
                            <div className="py-1 px-1.5 flex bg-gray-100 justify-between lg:mr-10 mb-2 text-gray-600 text-sm">
                                <div>Role: {x.role}</div>
                                <div>{x.duration}</div>
                            </div>
                            <div className="lg:mr-10 px-1.5"> {x.shortDescription}</div>

                            {!_.isEmpty(x.tech) && <div className="m-2 text-small text-gray-600 italic px-1.5">{mergedTech(x.tech).join(", ")}</div>}
                        
                            
                        </div>
                    ))}
                </Section>

                {/* <Section title="Project Details">
                    <div>
                        {profileData.filter(x => !_.isEmpty(x.projectName)).map(x => (
                            <div className="border-b-2 mt-5">
                                <div className="text-black text-base">{x.projectName} <span className="text-gray-600"> - {x.company}</span></div>
                                <div className="flex justify-between lg:pr-36 mb-2 text-gray-600 text-sm border-b border-dashed">
                                    <div>{x.role}</div>
                                    <div>{x.duration}</div>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: x.htmlContent }} />
                                <Tags tags={x.tech} />
                            </div>
                        ))}
                    </div>
                </Section> */}
            </div>
        </Layout>)


}

export default Content