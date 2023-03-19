import { getTopRated } from "../../feature/toprated/topratedSlice";
import {
  Button,
  Card,
  Col,
  Input,
  Modal,
  Row,
  Segmented,
  Space,
  Image,
} from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SearchPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@src/app/store";
import Preview from "../../components/Preview/Preview";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

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

const SearchPage = () => {
  const location = useLocation();
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading } = useSelector((state: AppState) => state.toprated);
  const resultData = data.results;
  const result = location.search.slice(1);
  const getValue = options.map((item) => item.value);

  const [segment, setSegment] = useState(getValue[0]);

  const [element, setElement] = useState({
    poster_path: "",
    title: "",
    original_language: "",
    release_date: "",
    vote_average: 0,
    overview: "",
  });

  const handleOnClickPreview = (index: number) => {
    setVisible(true);
    setElement(data.results[index]);
  };

  const filterSearching = resultData.filter(
    (item) => item.title.replace(/\s+/g, "") === result
  );
  console.log(filterSearching);

  useEffect(() => {
    dispatch(getTopRated());
  }, [dispatch]);

  const handleOnClick = (value: string) => {
    navigate(`/search?${value}`);
  };
  const handleOnChange = () => {
    if (segment === "list") {
      setSegment("kanban");
    } else {
      setSegment("list");
    }
  };

  return (
    <div className={styles.search}>
      <Space.Compact>
        <Input
          placeholder="Search for a movie, tv show, person ..."
          onChange={(value) => setValue(value.target.value)}
          allowClear
        />
        <Button
          className={styles.buttonSearch}
          onClick={() => handleOnClick(value.replace(/\s+/g, ""))}
        >
          Search
        </Button>
      </Space.Compact>
      <div className={styles.title}>
        <span>Keyword: </span>
        <span>{result}</span>
      </div>
      <div className={styles.result}>
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
        <Segmented
          options={options}
          value={segment}
          onChange={handleOnChange}
        />
        {segment === "kanban" ? (
          <Row>
            {filterSearching.map((item, idx) => (
              <>
                <Col
                  onClick={() => handleOnClickPreview(idx)}
                  className={styles.card}
                  key={idx}
                  span={6}
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
                </Col>
              </>
            ))}
          </Row>
        ) : (
          <Row>
            {filterSearching.map((item, idx) => (
              <>
                <Col
                  onClick={() => handleOnClickPreview(idx)}
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
    </div>
  );
};

export default SearchPage;
