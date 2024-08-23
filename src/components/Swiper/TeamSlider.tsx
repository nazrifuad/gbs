import React, { useEffect, useState } from "react";
import { fetchAPI } from "../../utils/fetchData";
import Swiper from "swiper";
import SwiperTeam from "./SwiperTeam";
import "swiper/swiper-bundle.css";
import { Navigation, FreeMode } from "swiper/modules";

type Team = {
    attributes: {
        member_image: string;
        first_name: string;
        last_name: string;
        job_title: string;
        department: string;
        isBoss: boolean;
    };
};

export default function TeamSlider() {
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    function fetchData() {
        fetchAPI(`/teams`).then((data) => {
            setTeams(data.data);
        });
    }

    useEffect(() => {
        if(teams.length > 0) {
            const swiper = new Swiper(".swiper.team", {
              slidesPerView: 1,
              spaceBetween: 40,
              grabCursor: true,
              freeMode: true,
              speed: 1000,
              modules: [Navigation, FreeMode],
              navigation: {
                nextEl: ".custom-nav-wrapper.team .custom-button-next",
                prevEl: ".custom-nav-wrapper.team .custom-button-prev",
              },
              breakpoints: {
                320: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 2,
                },
                1300: {
                  slidesPerView: 3,
                },
              },
            });
        }
    }, [teams]);
    
    return (
        <>
            {teams.length > 0 && (
                <div className="subsection team-section pt-unset">
                    <div className="container">
                        <div className="general-heading-wrapper">
                            <div className="subheader-wrapper text-center">
                                <h5 className="main-font-gradient">Our team</h5>
                            </div>
                            <div className="sub-description mw-600 text-center mw-full-m mw-full-i">
                                <h3 className="font-white">Meet the people that make it happen</h3>
                            </div>
                        </div>

                        <div className="swiper-container team">
                            <div className="swiper team" data-scroll="" data-scroll-direction="horizontal" data-scroll-speed="2" data-cursor-text="drag">
                                <div className="swiper-wrapper">
                                   {teams.map((team, index) => (
                                    <SwiperTeam key={index} {...team.attributes} />
                                   ))} 
                                    {/* {teamMembers.map((member, index) => (
                                    <SwiperTeam key={index} {...member} />
                                ))} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
