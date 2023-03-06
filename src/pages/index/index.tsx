import React from "react";
import Taro, { useReady } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import Observer from "@/utils/observer";
import imgIcon from "@/assets/img.png";
import "./index.less";

const dataList = [
  {
    id: "1",
    image: imgIcon,
    title: "Taro埋点数据111",
  },
  {
    id: "2",
    image: imgIcon,
    title: "Taro埋点数据222",
  },
  {
    id: "3",
    image: imgIcon,
    title: "Taro埋点数据333",
  },
  {
    id: "4",
    image: imgIcon,
    title: "Taro埋点数据444",
  },
  {
    id: "5",
    image: imgIcon,
    title: "Taro埋点数据555",
  },
  {
    id: "6",
    image: imgIcon,
    title: "Taro埋点数据666",
  },
  {
    id: "7",
    image: imgIcon,
    title: "Taro埋点数据777",
  },
  {
    id: "8",
    image: imgIcon,
    title: "Taro埋点数据88",
  },
  {
    id: "9",
    image: imgIcon,
    title: "Taro埋点数据999",
  },
  {
    id: "10",
    image: imgIcon,
    title: "Taro埋点数据101010",
  },
  {
    id: "11",
    image: imgIcon,
    title: "Taro埋点数据111111",
  },
  {
    id: "12",
    image: imgIcon,
    title: "Taro埋点数据121212",
  },
  {
    id: "13",
    image: imgIcon,
    title: "Taro埋点数据131313",
  },
  {
    id: "14",
    image: imgIcon,
    title: "Taro埋点数据141414",
  },
  {
    id: "15",
    image: imgIcon,
    title: "Taro埋点数据151515",
  },
];

const Index = () => {
  const current = Taro.getCurrentInstance().page;
  useReady(() => {
    Taro.nextTick(() => {
      const ob = new Observer({
        selector: ".list",
        current,
        onFinal: (startTime, endTime, node) => {
          console.log(startTime, endTime, node);
        },
      });
      ob.connect();
    });
  });
  const handleClick = (e) => {
    console.log(e)
  }
  return (
    <View className="page">
      {dataList.map((item) => (
        <View key={item?.id} id={item?.id} className="list" data-type={item} onClick={handleClick}>
          <View className="list-left">
            <Image className="list-left-image" src={item?.image} />
          </View>
          <View className="list-title">{item?.title}</View>
        </View>
      ))}
    </View>
  );
};

export default Index;
