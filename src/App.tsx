import { Typography } from "antd";

const { Title } = Typography;
import Icon from "@mdi/react";
import { mdiCalendarTextOutline } from "@mdi/js";
import { mdiDotsVertical } from "@mdi/js";
import { mdiPlus } from "@mdi/js";

import styled from "styled-components";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

const TileHeight = 40;
const DayLineHeight = TileHeight * 2 + 10;

enum DayOfWeek {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

enum Month {
  Jan,
  Feb,
  Mar,
  Apr,
  May,
  Jun,
  Jul,
  Aug,
  Sep,
  Opc,
  Nov,
  Dec,
}

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 50px 30px;
  align-items: center;
`;

const DayBlock = styled.div`
  /* height: ${DayLineHeight}px; */
  height: 100%;
  display: flex;
  gap: 10px;
  /* justify-content: space-between; */
`;

// 每天的一个大块叫Block，每天的某个时间段叫tile

const RoundButton = styled.div`
  color: rgb(0, 100, 255);
  /* border: 1px solid black; */
  /* TODO: 这部分的阴影代码没有理解，需要后续研究 */
  box-shadow: 0 0 10px 0 rgba(0, 100, 255, 0.5);
  position: fixed;
  bottom: 80px;
  right: 40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DayTag = styled.div`
  width: 55px;
  background-color: wheat;
  text-align: center;
  height: 100%;
`;

const TileGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
`;

const content = {
  calendar: [
    {
      events: [
        {
          from: "2024-03-07T08:23:15",
          to: "2024-03-08T14:45:30",
          description: "测试",
        },
      ],
    },
    {},
  ],
  setting: {
    // start和end 的数字可以是0 -（24+6=30）
    defaultDayStartTime: 8,
    defaultDayEndTime: 23,
  },
};

const DayTimeTileNumber =
  content.setting.defaultDayEndTime - content.setting.defaultDayStartTime;

function App() {
  const [now, setNow] = useState<Dayjs>(dayjs());
  const [tilesPerLine, setTilesPerLine] = useState<number>(5);
  useEffect(() => {
    setNow(dayjs());
    console.log("now", now.minute(), now.hour());
    // ⭐是不是没有必要这个useEffect?
  }, []); // 空数组作为依赖，确保useEffect只在组件挂载时执行一次
  // Calender Show
  const tileWidth = `${100 / tilesPerLine}%`;
  // 每个时间块
  const Tile = styled.div`
    height: ${TileHeight}px;
    width: ${tileWidth};
  `;
  const Event = styled.div`
    background-color: rgb(140, 255, 0);
    height: ${TileHeight * 0.9}px;
    border-radius: 6px;
    margin: ${TileHeight * 0.1}px;
  `;

  return (
    <>
      <Header>
        <Title level={2} style={{ margin: "10px 0" }}>
          {now.year()}
          {Month[now.month()]}
        </Title>
        <Icon path={mdiCalendarTextOutline} size={1} />
        <Icon path={mdiDotsVertical} size={1} />
      </Header>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {Array.from({ length: 5 }).map((_, idx) => {
          return (
            <DayBlock key={idx}>
              {/* TODO: DatTag的宽度好像不一致，这个怎么回事 */}
              <DayTag>
                <div>{DayOfWeek[(now.day() + idx) % 7]}</div>
                <div>{now.date() + idx}</div>
              </DayTag>
              <TileGroup>
                {Array.from({ length: DayTimeTileNumber }).map(() => (
                  <Tile>
                    <Event>wow</Event>
                  </Tile>
                ))}
                {/* 上面的纯占位用 */}
                {}
              </TileGroup>
            </DayBlock>
          );
        })}
      </div>
      <RoundButton>
        <Icon path={mdiPlus} size={1} />
      </RoundButton>
    </>
  );
}

export default App;
