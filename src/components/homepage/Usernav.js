import styles from "./Usernav.module.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState, useEffect } from "react";
import axios, { DAMA_URL } from "../../components/axios/axiosLaravelConfig";
import { aboutCompletUser } from "../../components/store/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import a1 from "../../assets/avatar/a1.png";
import a2 from "../../assets/avatar/a2.png";
import a3 from "../../assets/avatar/a3.png";
import a4 from "../../assets/avatar/a4.png";
import a5 from "../../assets/avatar/a5.png";
import a6 from "../../assets/avatar/a6.png";
import a7 from "../../assets/avatar/a7.png";
import a9 from "../../assets/avatar/a9.png";




function Usernav({ pageBack }) {
  const token = sessionStorage.getItem("session-token");
  const avatars = [a1, a2, a3, a4, a5, a6,a7,a9];
  const randomAvatar = Math.floor(Math.random() * avatars.length);
  const [userData, setUserData] = useState({});
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const companyData= useSelector ((state)=>state.user.userData)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function userDataComplete(data) {
    dispatch(aboutCompletUser(data));
  }

  function AboutUser() {
    axios
      .get(`${DAMA_URL}/api/user/about`, {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization:token,
        },
      })
      .then((response) => {
        setUserData(response.data);
        userDataComplete(response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
        navigate("/login");
      });
  }

  useEffect(() => {    
    if (companyData) {
      setUserData(companyData)
    }else{
      AboutUser();
      
    }

    const storedAvatar = sessionStorage.getItem("selected-avatar");
    if (storedAvatar) {
      setSelectedAvatar(storedAvatar);
    } else {
      const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
      setSelectedAvatar(randomAvatar);
      sessionStorage.setItem("selected-avatar", randomAvatar);
    }
  }, []);

  function getRandomAvatar() {
    return selectedAvatar || avatars[randomAvatar];
  }

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        {pageBack && (
          <div className={styles.pageBack} onClick={handleGoBack}>
            <p title="Voltar">
              <IoMdArrowRoundBack />
            </p>
          </div>
        )}

        <div className={styles.avatarRole}>
          <div className={styles.userData}>
            <span title={userData.name}>{userData.name}</span>
            <p title={userData.organizaçao}>{userData.organizaçao}</p>
          </div>

          <div className={styles.avatar}>
            <img src={getRandomAvatar()} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Usernav;
