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
  const [result, setResult] = useState<string>();

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

  function createTable() {
    const col = profileList.length;

    let markdown = `## Team`;

    // markdown += `\n|`;
    // for (let i = 0; i < col; i++) {
    //   markdown += `|`;
    // }

    markdown += `\n|`;
    for (const item of profileList) {
      markdown += `<img src="${item.image}" width="150" height="150"/>|`;
    }

    markdown += `\n|`;
    for (let i = 0; i < col; i++) {
      markdown += `:-:|`;
    }

    markdown += `\n|`;
    for (const item of profileList) {
      if (item.name) {
        markdown += `${item.name}<br/>`;
      }
      markdown += `[@${item.id}](${item.url})|`;
    }

    setResult(markdown);
  }

  function copyResult() {
    navigator.clipboard.writeText(result as string).then(() => {
      alert("마크다운 코드가 복사되었습니다! 리드미에 붙여넣어보세요");
    });
  }

  return (
    <div className="App">
      <RowWrapper>
        <div>
          <h1>Github Markdown Table Generator</h1>
          <h5>
            팀원의 깃허브 아이디를 입력하면 깃허브 프로필로 이루어진 마크다운
            표를 자동으로 생성합니다
          </h5>
          <form onSubmit={onSubmit}>
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <button type="submit">검색</button>
            <div>
              <a
                target="_blank"
                href="https://github.com/seondal/profile-table-md">
                사용법 (깃허브 리드미)
              </a>
            </div>
          </form>
        </div>
        {profile && (
          <div>
            <ProfileCard data={profile} size={"12rem"} />
            <button onClick={addProfile}>추가하기</button>
          </div>
        )}
      </RowWrapper>

      {profileList.length !== 0 && (
        <div>
          <h4>추가된 팀원 {profileList.length}명</h4>
          <List>
            {profileList.map((item, idx) => (
              <ProfileCard data={item} size={"8rem"} key={idx} />
            ))}
          </List>
          <button onClick={createTable}>표 생성하기</button>
          {result && <button onClick={copyResult}>마크다운 복사하기</button>}
        </div>
      )}
      {result && <Result>{result}</Result>}
    </div>
  );
}
export default App;

const RowWrapper = styled.section`
  width: 100%;
  justify-content: space-between;
`;

const List = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap-reverse;
`;

const Result = styled.div`
  padding: 1rem;
  white-space: pre-wrap;
`;
