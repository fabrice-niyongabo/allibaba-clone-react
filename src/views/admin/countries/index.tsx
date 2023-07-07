import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import { RootState } from "../../../reducers";
import { app } from "../../../constants";
import {
  errorHandler,
  setHeaders,
  toastMessage,
} from "../../../components/helpers";
import FullPageLoader from "../../../components/full-page-loader";
import { ICountry, TOAST_MESSAGE_TYPES } from "../../../interfaces";
import CountriesList from "../../../components/../constants/countries.json";
import { Switch } from "@mui/material";

interface ICountryItemProps {
  item: { name: string; code: string };
  countries: ICountry[];
  setIsLoading: any;
  token: string;
}
const CountryItem = ({
  item,
  countries,
  setIsLoading,
  token,
}: ICountryItemProps) => {
  const [exists, setExists] = useState(false);
  useEffect(() => {
    const ex = countries.find((obj) => obj.name === item.name);
    if (ex && ex.isActive) {
      setExists(true);
    }
  }, [countries]);
  const handleClick = () => {
    setIsLoading(true);
    setExists(!exists);
    axios
      .put(app.BACKEND_URL + "/countries/", { ...item }, setHeaders(token))
      .then((res) => {
        setIsLoading(false);
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
      })
      .catch((error) => {
        setExists(!exists);
        errorHandler(error);
        setIsLoading(false);
      });
  };
  return (
    <Col md={3}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ flex: 1, marginRight: 10 }}>{item.name}</p>
        <Switch checked={exists} onClick={() => handleClick()} />
      </div>
    </Col>
  );
};

const Countries = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState<ICountry[]>([]);

  const fetchCountries = () => {
    setIsLoading(true);
    axios
      .get(app.BACKEND_URL + "/countries/all/", setHeaders(token))
      .then((res) => {
        setCountries(res.data.countries);
        setIsLoading(false);
      })
      .catch((error) => {
        errorHandler(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchCountries();
  }, []);
  return (
    <div>
      <Row>
        <Col md={12}>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Countries
            </CardTitle>
            <CardBody>
              <Row>
                {CountriesList.map((item, index) => (
                  <CountryItem
                    key={index}
                    item={item}
                    countries={countries}
                    setIsLoading={setIsLoading}
                    token={token}
                  />
                ))}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <FullPageLoader open={isLoading} />
    </div>
  );
};

export default Countries;
