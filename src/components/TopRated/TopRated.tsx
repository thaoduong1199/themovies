import { AppDispatch, AppState } from "@src/app/store";
import { getTopRated } from "../../feature/toprated/topratedSlice";
import { Card, Col, Row, Image, Modal, Segmented } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Preview from "../Preview/Preview";
import styles from "./TopRated.module.scss";
import TopRatedSkeleton from "./TopRatedSkeleton";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";

const options = [
  {
    value: "list",
    icon: <BarsOutlined />,
  },
  {
    value: "kanban",
    icon: <AppstoreOutlined />,
  },
];

const TopRated = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading } = useSelector((state: AppState) => state.toprated);
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
    dispatch(getTopRated());
  }, [dispatch]);

  if (isLoading) {
    return <TopRatedSkeleton />;
  }
  return (
    <div className={styles.topRated}>
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
            <>
              <div
                onClick={() => handleOnClick(idx)}
                className={styles.card}
                key={idx}
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
            </>
          ))}
        </div>
      ) : (
        <Row>
          {listFilm.map((item, idx) => (
            <>
              <Col
                onClick={() => handleOnClick(idx)}
                className={styles.cardList}
                key={idx}
                span={24}
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
              </Col>
            </>
          ))}
        </Row>
      )}
    </div>
  );
};

export default TopRated;
