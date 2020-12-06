import styled, { css } from 'styled-components';

interface ItemProps {
  isErrored: boolean;
}

interface ContainerProps {
  isFinished: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 72rem;
  height: 4rem;
  display: flex;
  color: #313131;
  align-items: center;
  background: #f6f6f6;
  border-radius: 0.8rem;
  padding: 0.8rem 0.8rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);

  ${props =>
    props.isFinished &&
    css`
      animation: fadeOut 0.4s;

      @keyframes fadeOut {
        from {
          opacity: 1;
        }

        to {
          opacity: 0;
        }
      }
    `}

  & + div {
    margin-top: 0.8rem;
  }
`;

export const RecyclerInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 14rem;

  img {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    span {
      color: #818181;
      font-size: 1rem;
    }

    p {
      font-size: 1.2rem;
    }
  }
`;

export const Form = styled.form`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const ItemsContainer = styled.div`
  flex: 1;
  display: flex;
  margin: 0 1.6rem;
  align-items: center;
  justify-content: center;
`;

export const Item = styled.div<ItemProps>`
  display: flex;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      input {
        border: 2px solid #c53030 !important;
      }
    `}

  img {
    width: 3.2rem;
    height: 3.2rem;
  }

  input {
    border: 0;
    height: 2rem;
    width: 4.8rem;
    font-size: 1rem;
    background: #e6e6e6;
    padding-left: 0.4rem;
    border-radius: 0.4rem;
  }

  & + div {
    margin-left: 0.8rem;
  }
`;

export const FinishRecycling = styled.button`
  border: 0;
  width: 10rem;
  display: flex;
  height: 2.6rem;
  color: #228112;
  background: #9af58a;
  align-items: center;
  justify-content: center;
  border-radius: 0.4rem;
  transition: transform 0.2s;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);

  svg {
    margin-right: 0.8rem;
  }

  &:hover {
    transform: scale(1.05);
  }
`;
