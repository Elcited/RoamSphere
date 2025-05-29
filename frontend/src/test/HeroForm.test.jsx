import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HeroForm from "../ui/HeroForm";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import * as routeSlice from "../features/routeDetail/routeSlice";
import * as mapSlice from "../features/map/mapSlice";
import * as searchSlice from "../features/search/searchSlice";
import * as useQueryUpdaterModule from "../hooks/useQueryUpdater";

// mock gsap，避免动画影响测试
jest.mock("gsap", () => ({
  to: jest.fn(),
}));

// mock HeroFormButton，防止测试时出现额外复杂行为
// jest.mock("./HeroFormButton", () => props => (
//   <button onClick={props.handleClick}>{props.label}</button>
// ));

const mockStore = configureStore([]);

describe("HeroForm 组件测试", () => {
  let store;
  let mockUpdateQueryAndNavigate;

  beforeEach(() => {
    store = mockStore({});

    // spy dispatch
    store.dispatch = jest.fn();

    // mock 自定义 hook 返回的函数
    mockUpdateQueryAndNavigate = jest.fn();
    jest
      .spyOn(useQueryUpdaterModule, "default")
      .mockReturnValue({ updateQueryAndNavigate: mockUpdateQueryAndNavigate });

    // spy action creators
    jest
      .spyOn(routeSlice, "setStart")
      .mockImplementation(payload => ({ type: "setStart", payload }));
    jest
      .spyOn(routeSlice, "setEnd")
      .mockImplementation(payload => ({ type: "setEnd", payload }));
    jest
      .spyOn(routeSlice, "setStrategy")
      .mockImplementation(payload => ({ type: "setStrategy", payload }));
    jest
      .spyOn(routeSlice, "setTravelMode")
      .mockImplementation(payload => ({ type: "setTravelMode", payload }));

    jest
      .spyOn(mapSlice, "setCurrentCenterLocation")
      .mockImplementation(payload => ({
        type: "setCurrentCenterLocation",
        payload,
      }));
    jest
      .spyOn(mapSlice, "setHasRouteEnd")
      .mockImplementation(payload => ({ type: "setHasRouteEnd", payload }));
    jest
      .spyOn(mapSlice, "setMapMode")
      .mockImplementation(payload => ({ type: "setMapMode", payload }));
    jest
      .spyOn(mapSlice, "setUseEndAsCenter")
      .mockImplementation(payload => ({ type: "setUseEndAsCenter", payload }));

    jest
      .spyOn(searchSlice, "setSearchPanelExpanded")
      .mockImplementation(payload => ({
        type: "setSearchPanelExpanded",
        payload,
      }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("输入框能正确输入并显示内容", async () => {
    render(
      <Provider store={store}>
        <HeroForm />
      </Provider>
    );

    const startInput = screen.getByPlaceholderText("起点");
    const endInput = screen.getByPlaceholderText("终点");

    await userEvent.type(startInput, "北京");
    await userEvent.type(endInput, "上海");

    expect(startInput).toHaveValue("北京");
    expect(endInput).toHaveValue("上海");
  });

  test("点击按钮后会触发正确的 dispatch 和 updateQueryAndNavigate", async () => {
    render(
      <Provider store={store}>
        <HeroForm />
      </Provider>
    );

    const startInput = screen.getByPlaceholderText("起点");
    const endInput = screen.getByPlaceholderText("终点");

    await userEvent.type(startInput, "北京");
    await userEvent.type(endInput, "上海");

    const button = screen.getByRole("button", { name: /准 备 !/i });
    await userEvent.click(button);

    // 断言 dispatch 触发了正确的 action
    expect(store.dispatch).toHaveBeenCalledWith(routeSlice.setStart("北京"));
    expect(store.dispatch).toHaveBeenCalledWith(routeSlice.setEnd("上海"));
    expect(store.dispatch).toHaveBeenCalledWith(
      mapSlice.setUseEndAsCenter(true)
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      mapSlice.setCurrentCenterLocation("上海")
    );
    expect(store.dispatch).toHaveBeenCalledWith(mapSlice.setHasRouteEnd(true));
    expect(store.dispatch).toHaveBeenCalledWith(mapSlice.setMapMode("route"));
    expect(store.dispatch).toHaveBeenCalledWith(
      searchSlice.setSearchPanelExpanded(true)
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      routeSlice.setTravelMode("driving")
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      routeSlice.setStrategy(`0,1,2`)
    );

    // 断言 updateQueryAndNavigate 被正确调用
    expect(mockUpdateQueryAndNavigate).toHaveBeenCalledWith(
      {
        startLocation: "北京",
        endLocation: "上海",
        strategy: 2,
        mapmode: "route",
        travelMode: "driving",
      },
      "/map/routes/route_overview/route_detail",
      { state: "fromHomePage" }
    );
  });
});
