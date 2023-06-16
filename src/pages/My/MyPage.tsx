import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useMutation } from "react-query";
import loginUserIdState from "../../recoil/login/userInfo";
import {
  fecthPosts,
  fecthReviews,
  fecthUserInfo,
  fetchMyInfo,
} from "../../api/userInfo";
import profileIconEditing from "../../../public/myPage/profileIconEditing.svg";
import UserId from "../../components/SignUpPage/UserId";

// 최상단 컨테이너
const ParentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 프로필 박스 영역
const ProfileArea = styled.div`
  width: 1120px;
  height: 315px;
  display: flex;
  background-color: white;
`;

// 프로필 박스 내 이미지 박스 영역
const ImageBox = styled.div`
  width: 170px;
  height: 170px;
`;

// 프로필 박스 내 이미지 업로드 영역(원, 클릭시~)
const ImageArea = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: rgba(181, 191, 105, 1);
  margin-top: 30px;
`;

// UserInfo 컴포넌트를 감싸는 컨테이너
const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

// 유저인포(스코어, 닉네임, 수정)영역
const UserInfo = styled.div`
  display: flex;
  align-items: flex-start;
  width: 700px;
  height: 20px;
  padding: 10px;
  justify-content: space-between;
`;

// 유저 스코어 영역
const UserScore = styled.div`
  border: 1px solid black;
  width: 120px;
  height: 22px;
  border-radius: 7px;
  border: none;
`;

// 유저 닉네임 영역
const NickName = styled.div`
  width: 120px;
  height: 22px;
  border-radius: 7px;
  border: none;
`;

// 수정 버튼 영역
const PixButton = styled.button`
  width: 141px;
  height: 42px;
  border: 1px solid #d5d5d5;
  border-radius: 8px;
  background-color: white;
  color: black;
  position: relative;
  align-self: flex-end;
  margin-top: 10px;
  margin-left: 400px;
`;

// 텍스트 입력 영역
const TextArea = styled.textarea`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 809px;
  height: 184px;
  font-size: 15px;
  /* margin-bottom: 100px; */
  padding: 20px;
  gap: 10px;
  border: 1px solid #d6d6d6;
  box-shadow: 0px 0px 0px #cbdafc;
  border-radius: 5px;
  resize: none;
`;

// 후기, 게시글 영역
const PostContainer = styled.div`
  width: 1120px;
  background-color: white;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  font-size: 16px;
`;

// 임시 영역
const ImsiArea = styled.div`
  width: 1120px;
  display: flex;
  border-bottom: 1px solid rgba(181, 191, 105, 1);
  position: absolute;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  justify-content: space-between;
`;

// 리뷰 영역
const ReviewArea = styled.div`
  margin-left: 280px;
`;

// 작성한 게시글 영역
const PostArea = styled.div`
  margin-right: 280px;
`;

const ImsiArea2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 160px;
  text-align: left;
  border-bottom: 1px solid #d6d6d6;
`;

const CreatedTime = styled.div`
  color: rgba(133, 133, 133, 1);
  width: 74px;
  height: 34px;
`;

const Mile = styled.div`
  width: 75px;
  height: 14px;
  color: rgba(0, 0, 0, 0.5);
`;

const ReviewNickName = styled.div`
  width: 118px;
  height: 36px;
  color: rgba(0, 0, 0, 0.5);
`;

const ReviewContents = styled.div`
  width: 458px;
  height: 59px;
  color: rgba(0, 0, 0, 1);
`;

const ReviewContainer = styled.div`
  width: 1119px;
  height: 254px;
  margin-top: 150px;
`;

// // 리뷰 데이터 타입
// interface ReviewsDataType {
//   postTitle: string;
//   userId: string;
//   review: { review: string; score: number }[];
//   score: number;
//   date: string;
// }

function MyPage() {
  const id = sessionStorage.getItem("id");
  const [editing, setEditing] = useState(false);
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [owner, setOwner] = useState(true);
  const [score, setScore] = useState(20);
  const [post, setPost] = useState("");
  // 유저 리뷰 상태
  const [reviews, setReviews] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  // 유저정보 가져오는 뮤테이션 함수
  const { mutate: mutateGetUserInfo } = useMutation(fecthUserInfo, {
    onSuccess: (response) => {
      const userInfo = response;
      setNickname((prev) => userInfo.nickname);
      setContent((prev) => userInfo.content);
      setImgUrl((prev) => userInfo.imgUrl);
      setOwner((prev) => userInfo.owner);
      setScore((prev) => userInfo.score);
    },
    onError: (error) => {},
  });

  // 리뷰 가져오는 뮤테이션 함수
  const { mutate: mutateGetReviews } = useMutation(fecthReviews, {
    onSuccess: (response) => {
      setReviews((prev: any) => [...reviews, ...response]);
      // reviews.map((review)=>review.title)
    },
    onError: (error) => {},
  });

  // 게시글 가져오는 뮤테이션 함수
  const { mutate: mutateGetPosts } = useMutation(fecthPosts, {
    onSuccess: (response) => {
      setPosts((prev: any) => [...posts, ...response]);
    },
    onError: (error) => {},
  });

  // 변경된 유저 정보 저장하는 함수?
  // const { mutate: mutatePutMyInfo } = useMutation(fetchMyInfo, {
  //   onSuccess: (response) => {},
  //   onError: (error) => {},
  // });

  const editHandler = () => {
    setEditing((prevEditing) => !prevEditing);
  };
  // 컴포넌트 렌더링 시 유저정보, 리뷰 가져오기
  useEffect(() => {
    if (id) {
      mutateGetUserInfo(id);
      // mutatePutMyInfo(id);
      mutateGetReviews(id);
      mutateGetPosts(id);
      // const post = fecthPosts(id);
    }
  }, []);

  // 이미지 버튼 클릭시
  const clickFileInput = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput?.click();
  };

  // 수정하기 버튼 클릭함수
  const clickButton = () => {
    if (editing) {
      const userInfo = {
        nickname,
        image: null,
        content,
      };
      fetchMyInfo(id, userInfo);
    }
    setEditing(() => !editing);
  };

  return (
    <ParentContainer>
      <ProfileArea>
        <ImageBox>
          <input type="file" style={{ display: "none" }} id="fileInput" />
          <button type="button" onClick={clickFileInput}>
            이미지 수정
          </button>
          <ImageArea />
        </ImageBox>
        <UserInfoContainer>
          <UserInfo>
            <UserScore>
              <div>{score}mile</div>
            </UserScore>
            <NickName>
              <div>{nickname}님</div>
            </NickName>
            {owner && (
              <div>
                <div>
                  <TextArea
                    readOnly={!editing}
                    value={content}
                    placeholder="간단한 자기 소개를 해주세요."
                    onChange={(e) => setContent(e.target.value)}
                  />

                  {/* <PixButton onClick={() => setEditing(!editing)}> */}
                  <PixButton onClick={clickButton}>
                    {editing ? "저장" : "수정하기"}
                  </PixButton>

                  {/* {content === null ? (
                    <div>수정하기를 통해 프로필을 수정할 수 있습니다.</div>
                  ) : (
                    <div>{content}</div>
                  )} */}
                </div>
              </div>
            )}
          </UserInfo>
        </UserInfoContainer>
      </ProfileArea>
      <PostContainer>
        <ImsiArea>
          {/* 게시글 상 하단 실선 추가 */}
          <ReviewArea>리뷰</ReviewArea>
          <PostArea>게시글</PostArea>
        </ImsiArea>
        <ImsiArea2>
          <ReviewContainer>
            {reviews.map((review) => {
              const formattedDate = new Date(review.createdAt)
                .toLocaleString("ko-KR", {
                  year: "2-digit",
                  month: "2-digit",
                  day: "2-digit",
                  hour12: false,
                })
                .slice(0, -1);

              return (
                <div key={`${review.userId}-${review.createdAt}`}>
                  <div>
                    <div style={{ display: "flex" }}>
                      <CreatedTime>{formattedDate}</CreatedTime>
                      <Mile>{review.point}mile</Mile>
                      <ReviewNickName>{review.userId}</ReviewNickName>
                    </div>
                    <ReviewContents> {review.review}</ReviewContents>
                  </div>
                </div>
              );
            })}
            {reviews.map((review) => {
              const formattedDate = new Date(review.createdAt)
                .toLocaleString("ko-KR", {
                  year: "2-digit",
                  month: "2-digit",
                  day: "2-digit",
                  hour12: false,
                })
                .slice(0, -1);

              return (
                <div key={`${review.userId}-${review.createdAt}`}>
                  <div>
                    <div style={{ display: "flex" }}>
                      <CreatedTime>{formattedDate}</CreatedTime>
                      <Mile>{review.point}mile</Mile>
                      <ReviewNickName>{review.userId}</ReviewNickName>
                    </div>
                    <ReviewContents> {review.review}</ReviewContents>
                  </div>
                </div>
              );
            })}
          </ReviewContainer>
        </ImsiArea2>
      </PostContainer>
    </ParentContainer>
  );
}

export default MyPage;
