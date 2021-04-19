import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import {
  Details,
  Page,
  Outline_Button,
  AppButton,
} from "../../../styles/default";
import Toastifying, { TOASTIFY_OPTIONS } from "../../../components/Toastifying";
import { isAuthenticated } from "../../../services/auth";
import api from "../../../services/api";

import Footer from "../../../components/Footer";
import imgAux from "../../../assets/icon.svg";
import { toast } from "react-toastify";
import history from "../../../services/history/history";
import Stars from "../../../components/Stars";
import { Content, MyImage } from "./styles";
import { MyScreenView } from "../NoticesList/styles";

function NoticesDetails(props) {
  const [idNotice] = useState(props.match.params.id);
  const [notice, setNotice] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [errors, setErrors] = useState({});

  async function findNotice() {
    try {
      const response = await api.get("/notice/" + idNotice);

      if (response.data.success) {
        if (response.data.notice) {
          setNotice(response.data.notice);
        }
        if (response.data.featured) {
          setFeatured(response.data.featured);
        }
      }
    } catch (error) {
      setErrors({ message: "Não foi possível encontrar este Notice" });
      if (error.response) {
        if (error.response.data) {
          if (error.response.data.message) {
            setErrors({ message: error.response.data.message });
          }
        }
      }
    }
  }

  useEffect(() => {
    findNotice();
  }, []);

  const handleRemoveNotice = async (e) => {
    e.preventDefault();

    try {
      await api.delete("/notice/" + idNotice);
      toast.success("Removido com Sucesso!", TOASTIFY_OPTIONS);
      setTimeout(() => {
        history.push("/dashboard");
      }, 1500);
    } catch (error) {
      toast.error("Não foi Possível Remover", TOASTIFY_OPTIONS);
    }
  };

  const handleImageError = (image) => {
    //image.target.src = imgAux;
    image.target.style.display='none'
  };
  const handleEditeNotice = () => {
    history.push("/notice/editar/" + idNotice);
  };

  const updateFeatured = async (e) => {
    e.preventDefault();

    try {
      if (featured) {
        const response = await api.delete("/featured/" + featured._id);
        if (response.data.success) {
          toast.success("Removido dos destaques com sucesso", TOASTIFY_OPTIONS);

          setFeatured(null);
        }
      } else {
        const response = await api.post("/featured/create", {
          post: notice._id,
          postType: "Notice",
        });
        if (response.data.success) {
          toast.success(
            "Adicionado aos destaques com sucesso",
            TOASTIFY_OPTIONS
          );
          if (response.data.featured) {
            setFeatured(response.data.featured);
          }
        }
      }
    } catch (error) {
      toast.error("Não foi Possível Adicionar aos Destaques", TOASTIFY_OPTIONS);
    }
  };

  return (
    <Page>
      <Header />
      <MyScreenView>
        <Content>
          {isAuthenticated() === true ? (
            <Stars isFeature={featured} onClick={updateFeatured} />
          ) : null}
          <Toastifying />

          <label>{notice.title}</label>
          <h4>{notice.subtitle}</h4>
          <br></br>
          <hr></hr>

          {notice.imagePath ?
            <MyImage>
              <img
                onError={handleImageError}
                src={process.env.REACT_APP_API_URL + notice.imagePath}
              />
            </MyImage>
          :
            <></>
          }

          <br></br>
          <hr></hr>
          {notice.content?
            notice.content.split('\n').map((content) => {
              return <p>{content} <br /></p>
            })
            :
            <></>
          }
        </Content>

        {notice.link?.length > 1 ? (
          <div>
            <AppButton
              onClick={() => {
                window.location.assign(notice.link);
              }}
            >
              Accesito
            </AppButton>
          </div>
        ) : null}

        {isAuthenticated() && (
          <div>
            <Outline_Button type="danger" onClick={handleRemoveNotice}>
              {"Eliminar"}
            </Outline_Button>
            <Outline_Button type="warning" onClick={handleEditeNotice}>
              {"Editar"}
            </Outline_Button>
          </div>
        )}
      </MyScreenView>
      <Footer/>
    </Page>
  );
}

export default NoticesDetails;
