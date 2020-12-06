import styled, { css } from 'styled-components';

interface ItemProps {
  itemImage: string;
  selected: boolean;
  isErrored: boolean;
}

interface ImagesContainerProps {
  selected: number;
}

interface ButtonProps {
  selected: boolean;
}

export const Container = styled.div`
  width: 42rem;
  height: 12rem;
  display: flex;
  align-items: center;
  background: #f6f6f6;
  border-radius: 0.8rem;
  padding: 0 1.2rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);

  & + div {
    margin-top: 0.8rem;
  }
`;

export const ImagesContainer = styled.div<ImagesContainerProps>`
  display: flex;
  align-items: center;
  margin-right: 1.2rem;
  flex-direction: column;

  img {
    width: 160px;
    height: 150px;
    border-radius: 0.8rem;
  }

  .leaflet-container {
    z-index: 0;

    .leaflet-bar {
      border: 0;
    }

    a {
      display: none;
    }
  }

  .buttons-container {
    width: 2rem;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
  }

  ${props =>
    !!props.selected &&
    css`
      .buttons-container {
        margin-top: 0.8rem;
      }
    `}

  ${props =>
    !props.selected &&
    css`
      margin-top: 1.6rem;
      .buttons-container {
        top: -1.6rem;
      }
    `}
`;

export const Button = styled.button<ButtonProps>`
  border: 0;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background: #9af58a;

  ${props =>
    props.selected &&
    css`
      background: #228112;
    `}
`;

export const MapFooter = styled.footer`
  width: 160px;
  top: -2.4rem;
  z-index: 10;
  display: flex;
  height: 2.4rem;
  position: relative;
  background: #c2efd4;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 0.4rem 0.4rem;

  a {
    color: #1dbc5c;
    font-size: 0.85rem;
    text-decoration: none;
  }
`;

export const CollectPointInfo = styled.div`
  flex: 1;

  strong {
    font-size: 1.4rem;
  }

  p {
    font-size: 1rem;
    color: #818181;
  }
`;

export const ItemsContainer = styled.div`
  display: flex;
  color: #212121;
  font-size: 1.2rem;
  margin-top: 1.2rem;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;

  > div {
    display: flex;
    align-items: center;
  }

  span {
    margin-bottom: 0.4rem;
  }
`;

export const Item = styled.button<ItemProps>`
  border: 0;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);

  ${props =>
    css`
      background: url(${props.itemImage}) no-repeat center;
      background-size: 64%;
    `}

  ${props =>
    props.selected &&
    css`
      border: 2px solid #1dbc5c;
      background-color: #ddffdd;
    `}

  ${props =>
    props.isErrored &&
    css`
      background-color: #efc2c2;
      border: 2px solid #c53030;
    `}

  & + button {
    margin-left: 0.4rem;
  }
`;

export const CreateRecycling = styled.button`
  border: 0;
  top: -1.2rem;
  width: 10rem;
  display: flex;
  height: 2.6rem;
  color: #228112;
  position: relative;
  background: #9af58a;
  align-items: center;
  align-self: flex-end;
  border-radius: 0.4rem;
  justify-content: center;
  transition: transform 0.2s;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);

  svg {
    margin-right: 0.8rem;
  }

  &:hover {
    transform: scale(1.05);
  }
`;
