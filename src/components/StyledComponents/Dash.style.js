import styled from "styled-components";

export const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;
  margin: 20px;

  min-width: 300px;
  min-height: 70px;
  max-width: 350px;
  max-height: 100px;
`;
export const CardSection = styled.div`
  width: 70%;
  height: 100%;
`;

export const CardIcon = styled.div`
  background-color: ${({ color }) => color || '#ddd'};
  border-radius: 50%;
  width: 20%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg{
    font-size: 1.7rem;
    color: #fff;
  }

`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: #6b7b93;
`;

export const CardValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 5px 0;
`;

export const CardChange = styled.div`
  font-size: 0.9rem;
  width: 90%;
  color: ${({ isPositive }) => (isPositive ? 'green' : 'red')};
  p{
    color: #6b7b93; 
    display: flex;
    align-items: center;   
    justify-content: space-between;
    width: 85%;
  }
  span{
    display: flex;
    align-items: center;
    font-size: 1rem;
    border-radius: 5px;
    background-color: #ccf5e7;
    color: #3fa172;
 
  }

  .icon {
    
  }
`;
