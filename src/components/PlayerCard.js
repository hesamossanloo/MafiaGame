import * as React from "react";
import { Card, Title, Paragraph } from "react-native-paper";

const PlayerCard = ({ name, avatar, status }) => (
  <Card>
    <Card.Title title={name} subtitle={status} />
    <Card.Cover source={{ uri: avatar }} />
    <Card.Content>
      <Title>{name}</Title>
      <Paragraph>{status}</Paragraph>
    </Card.Content>
  </Card>
);

export default PlayerCard;
