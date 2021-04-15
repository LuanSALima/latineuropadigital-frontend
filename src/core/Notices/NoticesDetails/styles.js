import styled from "styled-components";

//Content of page 
//Ident and others
 export const Content = styled.main`
  width:95% !important;
  margin:0 auto !important;
  justify-content:center;
  justify-items:center;
  text-align:center;
  height:auto;
  padding:1rem;
  margin-top:3rem !important;
    //label is the title
    >label{
        font-size: 3.5rem;
    line-height: 4rem;
    letter-spacing: -0.15625rem;
        width:100%;
        margin:0 auto;
        padding:1rem;
        overflow-wrap:break-word;
    line-break:anywhere;
    }
    //subtitle / content title of the item
    >h4{
    font-size: 1.25rem;
    padding-left: 0;
    line-height: 1.75rem;
    overflow-wrap:break-word;
    line-break:anywhere;
    }
    //content of file
    >p{
    width:100%;
    overflow-wrap:line-break;
    margin: 0;
    padding: 0;
    line-height:38px !important;
    border: 0;
    text-align:left;
    font-size: 22px !important;
    font: inherit;
    overflow-wrap:break-word;
    line-break:anywhere;
}
    }
  >div{
      width:auto;
      padding:1rem;
  }
 @media(max-width:1000px){
     width:100% !important;
    margin-top: 0!important
    }
 `;

//Responsive Image
export const MyImage = styled.div`
  width: 100%;
  margin-left: 0.65rem;
  margin-bottom: 1rem;
  @media (max-width: 650px) {
    max-height: 100% !important;
  }
  img {
    min-width: 150px;
    max-height: 650px !important;
    max-width: 100%;
    height: auto;
    margin: 0 auto !important;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.2rem;
    transition: transform 0.3s ease;
    :hover {
      -webkit-transform: scale(1.05);
      -ms-transform: scale(1.05);
      transform: scale(1.05);
    }

    @media (max-width: 650px) {
      min-width: 150px;
      height: auto;
      margin: 0 auto !important;
    }
  }
`;
