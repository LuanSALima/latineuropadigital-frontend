import React, { useState, useEffect } from "react";

import { Card } from "./styles";

import imgTest from "../../assets/icon.svg";

import api from "../../services/api";

function FeaturedCard(props) {
  const [position, setPosition] = useState(props.position);
  const [prioritized, setPrioritized] = useState(false);
  const [options, setOptions] = useState([]);
  const [firstReq, setFirstReq] = useState(true);
  useEffect(() => {
    setOptions(props.options);
  }, [props.options]);

  useEffect(() => {
    if (props.prioritized === "true") {
      setPrioritized(true);
    } else {
      setPrioritized(false);
    }
  }, [props.prioritized]);

  const generateOptions = () => {
    return options.map((option) => {
      if (option === props.position) {
        return (
          <option selected value={option}>
            {option}
          </option>
        );
      } else {
        return <option value={option}>{option}</option>;
      }
    });
  };

  const changeFeaturedPosition = async (e) => {
    try {
      await api.put("featured/" + props.id + "/position", { position });

      props.callback();
    } catch (error) {
      alert(error.message);
    }
  };

  const changeFeaturedPrioritized = async () => {
    try {
      await api.put("featured/" + props.id + "/prioritized");

      props.callback();
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (!firstReq) {
      changeFeaturedPosition();
    }
  }, [position]);

  return (
    <Card>
      <img
        src={`${process.env.REACT_APP_API_URL}` + props.imagePath}
        onError={(image) => {
          image.target.src = imgTest;
        }}
      />
      <p>{props.title}</p>
      <form>
        <label>Destacado tiene prioridad?</label>
        <input
          type="checkbox"
          onChange={(e) => {
            changeFeaturedPrioritized();
          }}
          checked={prioritized}
        />
      </form>
      <form>
        <label>Posição</label>
        <br></br>
        <select
          onChange={(e) => {
            setPosition(e.target.value);
            setFirstReq(false);
          }}
        >
          {generateOptions()}
        </select>
      </form>
    </Card>
  );
}

export default FeaturedCard;
