import { useEffect, useState } from "react";
import styles from "./PlayingNow.module.scss";
import { Card, Modal } from "antd";
import { Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@src/app/store";
import { getPlayingNow } from "../../feature/playingnow/playingnowSlice";
import PlayingNowSkeleton from "./PlayingNowSkeleton";
import Preview from "../Preview/Preview";
import { Segmented } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";

const { Meta } = Card;

const options = [
  {
    value: "kanban",
    icon: <AppstoreOutlined />,
  },
  {
    value: "list",
    icon: <BarsOutlined />,
  },
];

const PlayingNow = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading } = useSelector(
    (state: AppState) => state.playingnow
  );
  const getValue = options.map((item) => item.value);

  const [segment, setSegment] = useState(getValue[0]);
  const [visible, setVisible] = useState(false);
  const [element, setElement] = useState({
    poster_path: "",
    title: "",
    original_language: "",
    release_date: "",
    vote_average: 0,
    overview: "",
  });
  const listFilm = data.results;

  const handleOnClick = (index: number) => {
    setVisible(true);
    setElement(data.results[index]);
  };
  const handleOnChange = () => {
    if (segment === "list") {
      setSegment("kanban");
    } else {
      setSegment("list");
    }
  };

  useEffect(() => {
    dispatch(getPlayingNow());
  }, [dispatch]);

  if (isLoading) {
    return <PlayingNowSkeleton />;
  }

  return (
    <div className={styles.playingNow}>
      {visible && (
        <Modal
          open={visible}
          onCancel={() => setVisible(false)}
          onOk={() => setVisible(false)}
          width={1000}
          centered
          style={{ backgroundColor: "transparent" }}
        >
          <Preview
            src={`https://image.tmdb.org/t/p/original${element.poster_path}`}
            title={element.title}
            lang={element.original_language.toUpperCase()}
            date={element.release_date}
            vote={element.vote_average}
            overview={element.overview}
          />
        </Modal>
      )}
      <Segmented options={options} value={segment} onChange={handleOnChange} />
      {segment === "kanban" ? (
        <div className={styles.containerCard}>
          {listFilm.map((item, idx) => (
            <div
              onClick={() => handleOnClick(idx)}
              key={idx}
              className={styles.card}
            >
              <Card
                loading={isLoading}
                hoverable
                style={{ width: 270, height: 550 }}
                cover={
                  <Image
                    src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                    alt={item.title}
                    loading="lazy"
                    preview={{ visible: false }}
                  />
                }
              >
                <Meta title={item.title} description={item.overview} />
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {listFilm.map((item, idx) => (
            <div
              onClick={() => handleOnClick(idx)}
              className={styles.cardList}
              key={idx}
            >
              <Image
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                alt={item.title}
                loading="lazy"
                preview={{ visible: false }}
                style={{ width: 100, height: 130 }}
              />
              <Meta
                className={styles.cardListRight}
                title={item.title}
                description={item.overview}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayingNow;
