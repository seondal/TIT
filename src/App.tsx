import { useState } from "react";
import "./App.css";
import { Profile } from "./types/interface";

function App() {
  const [value, setValue] = useState("");
  const [profile, setProfile] = useState<Profile>();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(value);
    setValue("");
  }

  return (
    <div className="App">
      <h1>Github Profile Markdown Table Generator</h1>
      <h5>
        깃허브 아이디를 입력하면 깃허브 프로필로 이루어진 마크다운 표를 자동으로
        생성합니다
      </h5>
      <form onSubmit={onSubmit}>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
      </form>
    </div>
  );
}

export default App;
