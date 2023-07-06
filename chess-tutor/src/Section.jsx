import React from 'react';

const sectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  backgroundColor: '#f5f5f5',
  color: '#333',
  fontFamily: 'Arial, sans-serif',
  lineHeight: '1.5em',
};

const moveStyle = {
  fontSize: '1.2em',
  marginBottom: '20px',
};

const analysisStyle = {
  fontSize: '1.5em',
  maxWidth: '80%',
  textAlign: 'justify',
};

const BestMove = ({ move }) => (
  <p style={moveStyle}>{`Best Move: ${move}`}</p>
);

const Analysis = ({ analysis }) => (
  <p style={analysisStyle}>{`Analysis: ${analysis}`}</p>
);

const Section = ({ move, analysis }) => (
  <section style={sectionStyle}>
    <BestMove move={move} />
    <Analysis analysis={analysis} />
  </section>
);

export default Section;
