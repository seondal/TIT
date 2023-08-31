import "./App.css";

import { useState } from "react";
import { Profile } from "./types/interface";
import axios from "axios";
import { GetUserResponse } from "./types/response";
import ProfileCard from "./components/ProfileCard";
import { styled } from "styled-components";

function App() {
  const [value, setValue] = useState("");
  const [profileList, setProfileList] = useState<Profile[]>([]);
  const [profile, setProfile] = useState<Profile>();

  async function getUser() {
    try {
      const response = await axios.get(`https://api.github.com/users/${value}`);
      if (response.status === 200) {
        const data: GetUserResponse = response.data;
        setProfile({
          id: data.login,
          image: data.avatar_url,
          url: data.html_url,
          name: data.name,
        });
      }
    } catch (e) {
      alert("올바른 깃허브 아이디를 입력해주세요");
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    getUser();
    setValue("");
  }

  function addProfile() {
    setProfileList((prev) => [...prev, profile as Profile]);
  }

  return (
    <div className="App">
      <h1>Github Profile Markdown Table Generator</h1>
      <h5>
        팀원의 깃허브 아이디를 입력하면 깃허브 프로필로 이루어진 마크다운 표를
        자동으로 생성합니다
      </h5>
      <form onSubmit={onSubmit}>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
      </form>
      {profile && (
        <div>
          <ProfileCard data={profile} size={200} />
          <button onClick={addProfile}>Yes</button>
        </div>
      )}
      {profileList.length !== 0 && (
        <div>
          <h4>추가된 팀원</h4>
          <List>
            {profileList.map((item, idx) => (
              <ProfileCard data={item} size={100} key={idx} />
            ))}
          </List>
        </div>
      )}
    </div>
  );
}
export default App;

const List = styled.div`
  display: flex;
  gap: 10px;
  width: 600px;
  overflow-x: scroll;
`;
