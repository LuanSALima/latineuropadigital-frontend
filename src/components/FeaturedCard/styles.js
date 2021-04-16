import styled from 'styled-components';


export const Card = styled.div`
    display: table;
    width: 20%;
    float: left;
    padding: 20px;
    background-color:var(--color-freela-white);
    border-radius:0.3rem;
    padding:1rem;
    border:1px solid var(--color-freela-hover);
    margin-left:1rem;
    margin-bottom:1rem;

    >img{
    border-radius:0.3rem;
        width: 200px;
        height: 200px;
    }

    >p{
        max-height: 50px;
        min-height: 50px;
        font-size: 20px;
        overflow: hidden;
    }

    >form{
        margin-top: 10px;
    }

    >form{
    button{
        width: 100%;
        height: 40px;
        margin-top: 10px;
    }

   >select{
        width:75%;
        color:black !important;
        background-color:white;
        border:1px solid black;
        padding:0.1rem;
        border-radius:0.2rem;
    }
    }
    option{
        text-align: center;
    }

    >form>input{
        width: 100%;
    }

    >form>input:focus{
        border: none;
        box-shadow: none;
    }

`;