import { useState } from 'react';


export function useDescriptions() {

    const [showAboutMeDesc, setAboutMeDesc] = useState(false);
    const [showProjectsDesc, setProjectsDesc] = useState(false);
    const [showSkillsDesc, setSkillsDesc] = useState(false);
    const [showContactMeDesc, setContactMeDesc] = useState(false);

    function showAboutMe(isFirst) {
        if (isFirst) {
            setTimeout(() => {
                setAboutMeDesc(true)
            }, 2000);
        } else {
            setTimeout(() => {
                setAboutMeDesc(true)
                setSkillsDesc(false)
                setContactMeDesc(false)
                setProjectsDesc(false)
            }, 600);
        }
    }

    function showProjects(isFirst) {
        if (isFirst) {
            setTimeout(() => {
                setProjectsDesc(true)
            }, 2000);
        } else {
            setTimeout(() => {
                setProjectsDesc(true)
                setAboutMeDesc(false)
                setSkillsDesc(false)
                setContactMeDesc(false)
            }, 600);
        }
    }

    function showSkills(isFirst) {
        if (isFirst) {
            setTimeout(() => {
                setSkillsDesc(true)
            }, 2000);
        } else {
            setTimeout(() => {
                setSkillsDesc(true)
                setProjectsDesc(false)
                setAboutMeDesc(false)
                setContactMeDesc(false)
            }, 600);
        }
    }

    function showContactMe(isFirst) {
        if (isFirst) {
            setTimeout(() => {
                setContactMeDesc(true)
            }, 2000);
        } else {
            setTimeout(() => {
                setContactMeDesc(true)
                setSkillsDesc(false)
                setProjectsDesc(false)
                setAboutMeDesc(false)
            }, 600);
        }
    }

    function hideAboutMe() {
        setAboutMeDesc(false)
    }

    function hideProjects() {
        setProjectsDesc(false)
    }

    function hideSkills() {
        setSkillsDesc(false)
    }

    function hideContactMe() {
        setContactMeDesc(false)
    }

    return {
        showAboutMeDesc,
        hideAboutMe,
        showProjectsDesc,
        hideProjects,
        showSkillsDesc,
        hideSkills,
        showContactMeDesc,
        hideContactMe,
        showAboutMe,
        showProjects,
        showSkills,
        showContactMe,
    };
}