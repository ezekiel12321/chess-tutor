import React from 'react';

const BestMove = ({ move, style }) => (
  <p style={style}>{`Best Move: ${move}`}</p>
);

const Analysis = ({ analysis, style }) => (
  <p style={style}>{`Analysis: ${analysis}`}</p>
);

const Section = ({ move, analysis }) => (
  <section style={{ border: '2px solid black', width: "90%", height: "100%", padding: "5px" }}>
    <BestMove move={move} style={{ padding: "5px" }} />
    <Analysis analysis={analysis} style={{ margin: "5px" }} />
  </section>
);

export default Section;
