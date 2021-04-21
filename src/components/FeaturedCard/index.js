import React, { useState, useEffect } from "react";

import { Card } from "./styles";

import imgTest from "../../assets/icon.svg";

import api from "../../services/api";

function FeaturedCard(props) {
  const [prioritized, setPrioritized] = useState(false);
  const [options, setOptions] = useState([]);

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
    return options.map((option, index) => {
      return <option key={index} value={option}>{option}</option>;
    });
  };

  const changeFeaturedPosition = async (positionSelected) => {
    try {
      await api.put("featured/" + props.id + "/position", { position: positionSelected });

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

  return (
    <Card>
      <img
        src={`${process.env.REACT_APP_API_URL}` + props.imagePath}
        onError={(image) => {
          image.target.src = imgTest;
        }}
        alt={"Imagen de "+props.title}
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
            changeFeaturedPosition(e.target.value);
          }}
          value={props.position}
        >
          {generateOptions()}
        </select>
      </form>
    </Card>
  );
}

export default FeaturedCard;
