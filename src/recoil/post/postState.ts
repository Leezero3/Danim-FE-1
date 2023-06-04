import { atom } from "recoil";
import type { QuillNode } from "../../types/postContextType";
import { SelectedMapInfoType } from "../../types/selectedMapInfoType";

// 키워드
export const selectedKeywordState = atom({
  key: "selectedKeywordState",
  default: "",
});

// 모이는 위치
export const selectedLocationState = atom({
  key: "selectedLocationState",
  default: "",
});

// 성별
export const selectedGenderState = atom({
  key: "selectedGenderState",
  default: [] as string[], // 배열의 원소는 문자열라는 것을 명시해줌
});

// 연령대
export const selectedAgeRangeState = atom({
  key: "selectedAgeRangeState",
  default: [] as string[], // 배열의 원소는 문자열라는 것을 명시해줌
});

// 모집 시작 날짜 - 글을 쓰는 당일로 고정
export const recruitmentStartDateState = atom({
  key: "recruitmentStartDateState",
  default: new Date(),
});

// 모집 마감 기한
export const recruitmentEndDateState = atom({
  key: "recruitmentEndDateState",
  default: null,
});

// 모집인원 - 항상 2인 이상 10인 이하
export const recruitmentCountState = atom({
  key: "recruitmentCountState",
  default: 2,
});

// 여행 시작 날짜
export const tripStartDateState = atom<Date | null>({
  key: "tripStartDateState",
  default: null,
});

// 여행 끝나는 날짜
export const tripEndDateState = atom<Date | null>({
  key: "tripEndDateState",
  default: null,
});

// 여행에 관련된 상세 설명 게시글 - type은 import 됨
export const tripPostContentState = atom<QuillNode[]>({
  key: "tripPostContentState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

// 지도 - 장소와 각각의 장소를 방문할 날짜 []
export const selectedInfosState = atom<SelectedMapInfoType[]>({
  key: "selectedInfosState",
  default: [],
});
