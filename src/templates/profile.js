import React, { useEffect } from "react"
import _ from "lodash";
import dayjs from "dayjs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faEnvelopeOpen } from "@fortawesome/free-regular-svg-icons"
import { faPhone, faPen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "gatsby"
import Layout from "../components/layout"
import Tags from "../components/tags";

const splitDuration = duration => {
    const parts = duration.split("-").map(x => x.trim());
    const fromString = parts[0];
    const toString = parts[1];

    const from = dayjs(fromString, "MMM YYYY");
    const to = toString.includes("Till Date") ? dayjs() : dayjs(fromString, "MMM YYYY");
    return { from, to }
}

const isToday = (day) => day.format("MMM YYYY") === dayjs().format("MMM YYYY")

const Section = ({ children, title }) =>
    <div className="py-2 border-b mb-2">
        <div class="text-black font-bold text-xl mb-2">{title}</div>
        <div className="px-2">
            {children}
        </div>
    </div>

const Content = ({ pageContext: { profileData } }) => {

    const achievements = profileData.flatMap(x => x.achievements)
    const techList = [...new Set(profileData.flatMap(x => x.tech))]
    const projectSummary = _.groupBy(
        profileData
            .map(x => ({ ...x, ...splitDuration(x.duration) }))
            .sort((x, y) => y.from.diff(x.from))
        , "company")

    return (
        <Layout isContent>
            <div className="my-5">
                <div className="flex justify-between lg:mr-20">
                    <div className="text-2xl">Arun Madhavan Govindarajan</div>
                    <div className="">Image goes here</div>
                </div>
                <div className="my-3 border-b py-2">
                    <div className="text-sm grid lg:grid-cols-4 gap-1 md:grid-cols-1 sm:grid-cols-1">
                        <div><Link to="https://www.linkedin.com/in/arunmadhavang/"><FontAwesomeIcon icon={faLinkedin} /> @arunmadhavang</Link></div>
                        <div><Link to="https://techmusings.dev/"><FontAwesomeIcon icon={faPen} /> https://techmusings.dev/</Link></div>
                        <div className="lg:col-span-2"><Link to="https://github.com/arunmadhavan-g"><FontAwesomeIcon icon={faGithub} /> @arunmadhavan-g</Link></div>
                        <div><Link to="mailto:arunmadhavan.g@gmail.com"><FontAwesomeIcon icon={faEnvelopeOpen} /> arunmadhavan.g@gmail.com</Link></div>
                        <div className="lg:col-span-3"><Link to="callto:+919840808667"><FontAwesomeIcon icon={faPhone} />+91 98408 08667</Link></div>
                    </div>
                </div>

                <Section title="Summary">
                    {achievements.map(x => <div>{x}</div>)}
                </Section>

                <Section title="Technologies">
                    <Tags tags={techList} />
                </Section>

                <Section title="Company Experience">
                    {
                        Object
                            .keys(projectSummary)
                            .map(company => {
                                const sortedSummary = projectSummary[company].sort((x, y) => y.from.diff(x.from))
                                const toDate = _.last(sortedSummary).to;
                                return (
                                    <div className="flex justify-between lg:mr-36">
                                        <div className="col-span-4 text-black">{company}</div>
                                        <div>{sortedSummary[0].from.format('MMM YYYY')}  - {isToday(toDate) ? "Till Date" : toDate.format('MMM YYYY')}</div>
                                    </div>
                                )
                            })
                    }
                </Section>

                <Section title="Project Experience">
                    {profileData.map(x => (
                        <div>
                            <div className="text-black">{x.projectName} <span className="text-gray-600"> - {x.company}</span></div>
                            <div className="flex justify-between lg:mr-36 mb-2 text-gray-600 text-sm">
                                <div>Role: {x.role}</div>
                                <div>{x.duration}</div>
                            </div>
                            <Tags tags={x.tech} />
                        </div>
                    ))}
                </Section>

                <Section title="Project Details">
                    <div>
                        {profileData.map(x => (
                            <div className="border-b">
                                <div className="text-black">{x.projectName} <span className="text-gray-600"> - {x.company}</span></div>
                                <div className="flex justify-between lg:pr-36 mb-2 text-gray-600 text-sm border-b">
                                    <div>{x.role}</div>
                                    <div>{x.duration}</div>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: x.htmlContent }} />
                                <Tags tags={x.tech} />
                            </div>
                        ))}
                    </div>
                </Section>
                

            </div>
        </Layout>)


}

export default Content