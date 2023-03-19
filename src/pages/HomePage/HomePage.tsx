import { useState } from "react";
import styles from "./Homepage.module.scss";
import { Button, Input, Space } from "antd";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import PlayingNow from "../../components/PlayingNow/PlayingNow";
import TopRated from "../../components/TopRated/TopRated";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [tabs, setTabs] = useState("1");
  const [value, setValue] = useState("");

  const onChange = (key: string) => {
    setTabs(key);
  };

  const navigate = useNavigate();

  const handleOnClick = (value: string) => {
    navigate(`/search?${value}`);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Now Playing`,
      children: <PlayingNow />,
    },
    {
      key: "2",
      label: `Top rated`,
      children: <TopRated />,
    },
  ];

  return (
    <div className={styles.homePage}>
      <div className={styles.banner}>
        <h2>Welcome</h2>
        <h3>
          Millions of movies, TV shows and people to discover. Explore now.
        </h3>
        <Space.Compact>
          <Input
            id="input"
            placeholder="Search for a movie, tv show, person ..."
            onChange={(value) => setValue(value.target.value)}
          />
          <Button
            className={styles.buttonSearch}
            onClick={() => handleOnClick(value.replace(/\s/g, ""))}
          >
            Search
          </Button>
        </Space.Compact>
      </div>

      <div className={styles.contentMovie}>
        <Tabs defaultActiveKey={tabs} items={items} onChange={onChange} />
      </div>
    </div>
  );
};

export default HomePage;
