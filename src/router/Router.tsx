import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { useMemo } from "react";
import {
  CreatePostPage1,
  CreatePostPage2,
  EditingPostPage1,
  EditingPostPage2,
  HomePage,
  NotFoundPage,
  PostPage,
} from "../pages";
import Layout from "../components/common/Layout";
import ScrollToTop from "../utils/ScrollToTop";
import SignUpPage from "../pages/SignUp/SignUpPage";
import LoginPage from "../pages/LoginPage";
import Redirection from "../components/LoginPage/Redirection";
import SignUpForSocialPage from "../pages/SignUp/SignUpForSocialPage";
import HomeLayout from "../components/common/HomeLayout";
import ChatPage from "../pages/Chat/ChatPage";
import MyPage from "../pages/My/MyPage";
import ChatRoomListPage from "../pages/Chat/ChatRoomList";
import PrivateRoute from "./PrivateRouter";
import NoFooterLayout from "../components/common/NoFooterLayout";
import SplashPage from "../components/common/SplashPage";
import MenuBar from "../components/HomePage/Mobile/MenuBar";

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 👇 index - 중첩 라우트 구조에서 부모 라우트와 정확히 일치하는 경로를 의미함 */}

          <Route path="post/:id" element={<PostPage />} />

          {/* 👇 존재하지 않는 페이지에 대한 처리 */}
          <Route path="*" element={<NotFoundPage />} />

          {/* 인증을 반드시 하지 않아야만 접속 가능한 페이지 정의 */}
          <Route element={<PrivateRoute authentication={false} />}>
            {/* <Route path="signup" element={SignUpRouteElement} /> */}
            <Route path="signup" element={<SignUpPage />} />
            <Route path="/signup/social" element={<SignUpForSocialPage />} />
            <Route path="login" element={<LoginPage />} />
            {/* <Route path="login" element={loginRouteElement} /> */}
            <Route path="/api/user/kakao/callback" element={<Redirection />} />
          </Route>

          {/* 인증을 반드시 해야지만 접속 가능한 페이지 정의 */}
          <Route element={<PrivateRoute authentication />}>
            <Route path="myPage/:id" element={<MyPage />} />
            <Route path="create-post/step1" element={<CreatePostPage1 />} />
            <Route path="create-post/step2" element={<CreatePostPage2 />} />
            <Route path="edit-post/step1/:id" element={<EditingPostPage1 />} />
            <Route path="edit-post/step2/:id" element={<EditingPostPage2 />} />
            <Route path="/chat-list" element={<ChatRoomListPage />} />
          </Route>
        </Route>

        <Route path="/" element={<NoFooterLayout />}>
          <Route element={<PrivateRoute authentication />}>
            <Route path="/chat/:postId" element={<ChatPage />} />
          </Route>
          <Route path="/menu-bar" element={<MenuBar />} />
        </Route>

        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        <Route path="/onboard" element={<SplashPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
