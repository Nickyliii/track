import { Component, PropsWithChildren } from "react";
import "./app.less";
import { init } from "./utils/wxTrack";
import { document } from "@tarojs/runtime";

init({
  dsn: "http://abc.com/api",
  apikey: "123",
  disabled: false,
  triggerWxEvent: (data) => {
    if (data.type === "tap") {
      const node = document.querySelector(`#${data?.target?.id}`);
      console.log(node, 'nodeeeeeeeeeeeeeeeeeeeeeeeeeeee')
    }
  },
});

class App extends Component<PropsWithChildren> {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    // this.props.children 是将要会渲染的页面
    return this.props.children;
  }
}

export default App;
