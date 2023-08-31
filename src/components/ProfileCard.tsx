import styled from "styled-components";
import { Profile } from "../types/interface";

interface ProfileCard {
  data: Profile;
  size: number;
}

export default function ProfileCard({ data, size }: ProfileCard) {
  return (
    <Container size={size}>
      <img src={data.image} />
      <div className="name">{data.name}</div>
      <a target="_blank" href={data.url}>
        @{data.id}
      </a>
    </Container>
  );
}

const Container = styled.div<{ size: number }>`
  border-radius: 20px;
  box-shadow: rgba(23, 25, 29, 0.3) 0 2px 20px;
  padding: 20px;
  width: ${(props) => props.size}px;

  img {
    border-radius: 50%;
    width: 100%;
  }

  .name {
    font-weight: bold;
    font-size: 24px;
  }
`;
