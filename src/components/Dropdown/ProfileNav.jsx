import { useEffect, useState, useRef } from "react"; // Added useRef
import { Link } from 'react-router-dom';
import settingsIcon from '../../assets/img/settings-icon.svg';
import logOutIcon from '../../assets/img/log-out-icon.svg';

import ProfileSettings from "../../components/Modal/ProfileSettings";

const ProfileNav = ({ isProfileDropdownVisible, closeDropdown, dropdownRef }) => {

  // open modal on profile settings link
  const [isProfileSettingsModalVisible, setProfileSettingsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Search submitted:", searchTerm);
    setProfileSettingsModalVisible(false);
  };

  // dropdown function
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(event.target);
      const isInsideLink = event.target.closest('.profile-dropdown-wrapper .item, .profile-dropdown-wrapper .item a');
      const isProfileImage = event.target.closest('.profile-img-wrapper');
      const isSearchInput = event.target.closest('.modal-item');

      if (isOutsideDropdown && !isInsideLink && !isProfileImage && !isSearchInput) {
        closeDropdown();
        setProfileSettingsModalVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [closeDropdown, dropdownRef, setProfileSettingsModalVisible]);

  // modal function (open/close) called
  const showModal = (modalType) => {
    if (modalType === 'ProfileSettings') {
      setProfileSettingsModalVisible(true);
    }
  };

  const closeModal = () => {
    setProfileSettingsModalVisible(false);
  };

  return (
    <>
      {isProfileDropdownVisible && (
        <div className="parent">
          <div className="profile-dropdown-wrapper" ref={dropdownRef}>
            <div className="item-wrap">
              <div className="item"> 
                <Link to="/" onClick={(event) => { event.preventDefault(); showModal("ProfileSettings"); }}>
                  <div className="icon">
                    <img src={settingsIcon} alt="Settings" />
                  </div>
                  <div className="desc">
                    <p>Profile Settings</p>
                  </div>
                </Link>
              </div>
              <div className="item" onClick={() => closeDropdown()}>
                <Link to="/log-out">
                  <div className="icon">
                    <img src={logOutIcon} alt="Log Out" />
                  </div>
                  <div className="desc">
                    <p>Log Out</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* profile setting modal */}
          <ProfileSettings
            isVisible={isProfileSettingsModalVisible}
            closeModal={closeModal}
            handleSearchChange={handleSearchChange}
            handleSearchSubmit={handleSearchSubmit}
            searchTerm={searchTerm}
          />
        </div>
      )}
    </>
  );
};

export default ProfileNav;
