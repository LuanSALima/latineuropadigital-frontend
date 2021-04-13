import styled from 'styled-components';


export const Card = styled.div`
    display: table;
    width: 20%;
    float: left;
    padding: 20px;

    >img{
        width: 200px;
        height: 200px;
    }

    >p{
        max-height: 50px;
        min-height: 50px;
        font-size: 20px;
        overflow: hidden;
    }

    >form>button{
        width: 100%;
        height: 40px;
        margin-top: 10px;
    }

    >form>select{
        width: 100%;
        height: 20px;
        font-size: 15px;
    }

    >form>select>option{
        text-align: center;
    }
`;